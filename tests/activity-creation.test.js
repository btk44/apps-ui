import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createServer as createHttpServer } from 'node:http';
import { test } from 'node:test';
import { createServer } from 'vite';

test('activity creation form action', async (t) => {
	const requests = [];
	let rejectInsert = false;
	const database = createHttpServer(async (request, response) => {
		let body = '';
		for await (const chunk of request) body += chunk;
		const url = new URL(request.url, 'http://localhost');
		requests.push({
			method: request.method,
			url,
			body: JSON.parse(body)
		});
		response.setHeader('Content-Type', 'application/json');
		if (url.pathname === '/rest/v1/rpc/search_activities') {
			response.end(
				JSON.stringify([
					{
						id: 7,
						name: 'Gallery visit',
						description: null,
						map_url: null,
						website_url: 'https://example.com',
						start_date: '2026-10-20T10:00:00Z',
						end_date: null,
						targets: ['Children'],
						categories: ['Art']
					}
				])
			);
		} else if (rejectInsert) {
			response.writeHead(400);
			response.end(JSON.stringify({ code: '23514', message: 'Insert rejected' }));
		} else {
			response.end(
				JSON.stringify({
					id: 42,
					version: 1,
					created_at: '2026-10-28T12:00:00Z',
					updated_at: '2026-10-28T12:00:00Z'
				})
			);
		}
	});
	database.listen(0, '127.0.0.1');
	await once(database, 'listening');
	t.after(() => new Promise((resolve) => database.close(resolve)));

	const previousUrl = process.env.DATABASE_URL;
	const previousKey = process.env.DATABASE_KEY;
	process.env.DATABASE_URL = `http://127.0.0.1:${database.address().port}`;
	process.env.DATABASE_KEY = 'local-test-key';
	t.after(() => {
		if (previousUrl === undefined) delete process.env.DATABASE_URL;
		else process.env.DATABASE_URL = previousUrl;
		if (previousKey === undefined) delete process.env.DATABASE_KEY;
		else process.env.DATABASE_KEY = previousKey;
	});

	const vite = await createServer({
		server: { middlewareMode: true, watch: null, hmr: false }
	});
	t.after(() => vite.close());
	const { actions: searchActions } = await vite.ssrLoadModule(
		'/src/routes/what-to-do/search/+page.server.ts'
	);
	const { actions } = await vite.ssrLoadModule('/src/routes/what-to-do/form/+page.server.ts');

	function submit(overrides = {}) {
		const formData = new FormData();
		const values = {
			name: ' New activity ',
			'location-lat': '51.1',
			'location-lng': '17.03',
			...overrides
		};
		for (const [key, value] of Object.entries(values)) {
			if (value !== undefined) formData.set(key, value);
		}
		return actions.createActivity({
			request: new Request('http://localhost/what-to-do/form?/createActivity', {
				method: 'POST',
				body: formData
			})
		});
	}

	await t.test('maps search filters and database rows through the search action', async () => {
		const formData = new FormData();
		formData.set('name', ' Gallery ');
		formData.set('distance', '12');
		formData.set('location-lat', '40');
		formData.set('location-lng', '-70');
		formData.set('targets', 'Children');
		formData.set('categories', 'Art');
		formData.set('startDate', '2026-10-01');

		const result = await searchActions.searchActivities({
			request: new Request('http://localhost/what-to-do/search?/searchActivities', {
				method: 'POST',
				body: formData
			})
		});
		const request = requests.at(-1);

		assert.equal(request.url.pathname, '/rest/v1/rpc/search_activities');
		assert.deepEqual(request.body, {
			p_name: 'Gallery',
			p_target_names: ['Children'],
			p_category_names: ['Art'],
			p_start_date: '2026-10-01T00:00:00.000Z',
			p_latitude: 40,
			p_longitude: -70,
			p_distance_m: 12000,
			p_is_active: true,
			p_limit: 50,
			p_offset: 0
		});
		assert.deepEqual(result, {
			activities: [
				{
					id: 7,
					name: 'Gallery visit',
					description: '',
					mapUrl: '',
					url: 'https://example.com',
					startDate: new Date('2026-10-20T10:00:00Z'),
					endDate: null,
					categories: ['Art'],
					targets: ['Children']
				}
			]
		});
	});

	await t.test(
		'saves minimal form input with null optional values and Python defaults',
		async () => {
			assert.deepEqual(await submit(), { success: true, id: 42 });
			assert.deepEqual(requests.at(-1).body, {
				name: 'New activity',
				description: null,
				address: null,
				country_code: null,
				region: null,
				city: null,
				location: 'SRID=4326;POINT(17.03 51.1)',
				activity_type: 'activity',
				map_url: null,
				website_url: null,
				start_date: null,
				end_date: null,
				is_active: true
			});
		}
	);

	await t.test('rejects invalid form values before contacting the database', async () => {
		const count = requests.length;
		for (const overrides of [
			{ name: ' ' },
			{ name: 'x'.repeat(256) },
			{ region: 'x'.repeat(101) },
			{ city: 'x'.repeat(101) },
			{ address: 'x'.repeat(501) },
			{ mapUrl: 'x'.repeat(501) },
			{ url: 'x'.repeat(501) },
			{ name: new Blob(['not a string']) },
			{ 'location-lat': undefined },
			{ 'location-lng': '' },
			{ 'location-lat': 'NaN' },
			{ 'location-lat': '90.01' },
			{ 'location-lat': '-90.01' },
			{ 'location-lng': '180.01' },
			{ 'location-lng': '-180.01' },
			{ startDate: 'invalid' },
			{ startDate: '2026-02-30' },
			{ endDate: '2026-13-01' },
			{ startDate: '2026-11-02', endDate: '2026-11-01' }
		]) {
			const result = await submit(overrides);
			assert.equal(result.status, 400, JSON.stringify(overrides));
			assert.equal(typeof result.data.message, 'string');
		}
		assert.equal(requests.length, count);
	});

	await t.test('accepts coordinate boundaries and equal dates', async () => {
		const result = await submit({
			'location-lat': '-90',
			'location-lng': '180',
			startDate: '2028-02-29',
			endDate: '2028-02-29'
		});
		assert.equal(result.success, true);
		assert.equal(requests.at(-1).body.location, 'SRID=4326;POINT(180 -90)');
		assert.equal(requests.at(-1).body.start_date, '2028-02-29T00:00:00.000Z');
	});

	await t.test('returns a logged action failure when insert fails', async () => {
		rejectInsert = true;
		const log = t.mock.method(console, 'error', () => {});
		const result = await submit();
		assert.equal(result.status, 500);
		assert.equal(typeof result.data.message, 'string');
		assert.equal(log.mock.callCount(), 1);
		log.mock.restore();
	});
});
