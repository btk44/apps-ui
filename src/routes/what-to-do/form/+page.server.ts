import { fail } from '@sveltejs/kit';

import type { Actions } from './$types';

import { t } from '$lib/apps/what-to-do/labels';
import type { ActivityInput } from '$lib/apps/what-to-do/models/activity-input';
import { database } from '$lib/server/database.server';
import { ActivityRepository } from '$lib/apps/what-to-do/server/activity-repository.server';
import type { IdNamePair, ValueDescPair } from '$lib/code/helper-types';



function getText(formData: FormData, key: string): string | undefined {
	const value = formData.get(key);
	return typeof value === 'string' ? value.trim() || undefined : undefined;
}

function getDate(formData: FormData, key: string): Date | undefined {
	const value = getText(formData, key);
	return value ? new Date(value) : undefined;
}


async function createActivity(activity: ActivityInput): Promise<{ id: number }> {
	const { data, error } = await database
		.from('activities')
		.insert({
			name: activity.name,
			description: activity.description ?? null,
			address: activity.address ?? null,
			country_code: activity.countryCode ?? null,
			region: activity.region ?? null,
			city: activity.city ?? null,
			location: `SRID=4326;POINT(${activity.longitude} ${activity.latitude})`,
			activity_type: activity.activityType ?? 'activity',
			map_url: activity.mapUrl ?? null,
			website_url: activity.url ?? null,
			start_date: activity.startDate?.toISOString() ?? null,
			end_date: activity.endDate?.toISOString() ?? null,
			is_active: activity.active ?? true
		})
		.select('id')
		.single()
		.overrideTypes<{ id: number }, { merge: false }>();

	if (error) {
		throw new Error(`Failed to create activity: ${error.message}`);
	}

	return data;
}

function validateForm(formData: FormData): { result: boolean, messages: { [key: string]: string } } {
	const result = { result: true, messages: {} };

	[ 'name', 'description'].forEach((key) => {
		const value = getText(formData, key) ?? '';
		if (!value || value.length === 0) { 
			result.result = false;
			result.messages = { ...result.messages, [key]: "provide a value" };
		}
	});

	([ ['name', 500], 
	   ['description', 500], 
	   ['region', 100], 
	   ['city', 100], 
	   ['address', 500], 
	   ['mapUrl', 500], 
	   ['url', 500] ] as [string, number][]).forEach(([key, limit]) => {
		const value = getText(formData, key) ?? '';
		if (value.length > limit) {
			result.result = false;
			result.messages = { ...result.messages, [key]: "too long" };
		}
	});

	['startDate', 'endDate'].forEach((key) => {
		const value = getText(formData, key) ?? '';
		if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
			result.result = false;
			result.messages = { ...result.messages, [key]: "invalid date format" };
		}
	});

	([ ['location-lat', 90], 
	   ['location-lng', 180]] as [string, number][]).forEach(([key, limit]) => {
		const value = getText(formData, key) ?? '';
		const numericValue = Number(value);
		if (!value || !Number.isFinite(numericValue) || Math.abs(numericValue) > limit) {
			result.result = false;
			result.messages = { ...result.messages, [key]: "invalid value" };
		}
	});

	return result
}



export const actions = {
	loadFormData: async () => {
		const [categories, targets] = await Promise.all([ 
			ActivityRepository.GetCategories(),
			ActivityRepository.GetTargets()
		]);

		return {
			categories: categories.map((category: IdNamePair): ValueDescPair => ({
				value: category.name,
				description: category.name
			})),
			targets: targets.map((target: IdNamePair): ValueDescPair => ({
				value: target.name,
				description: target.name
			})),
			errors: {}
		};
	},
	createActivity: async ({ request }) => {
		const formData = await request.formData();
		const validationResult = validateForm(formData);

		if (validationResult.result === false) {
			return fail(400, { message: "Cannot create activity", errors: { ...validationResult.messages } });
		}

		const activity: ActivityInput = {
			name: getText(formData, 'name') ?? '',
			description: getText(formData, 'description'),
			region: getText(formData, 'region'),
			city: getText(formData, 'city'),
			address: getText(formData, 'address'),
			mapUrl: getText(formData, 'mapUrl'),
			url: getText(formData, 'url'),
			latitude: Number(getText(formData, 'location-lat')),
			longitude: Number(getText(formData, 'location-lng')),
			startDate: getDate(formData, 'startDate'),
			endDate: getDate(formData, 'endDate')
		};

		try {
			const created = await createActivity(activity);
			return { success: true, id: created.id };
		} catch (error) {
			console.error('Failed to create activity.', error);
			return fail(500, { message: t.act_add_save_failed });
		}
	}
} satisfies Actions;
