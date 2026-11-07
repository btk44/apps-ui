import { fail } from '@sveltejs/kit';

import type { Actions } from './$types';

import type { ActivitySearchFilters } from '$lib/apps/what-to-do/models/activity-search-filters';
import type { ActivitySearchItem } from '$lib/apps/what-to-do/models/activity-search-item';
import { ActivityRepository } from '$lib/apps/what-to-do/server/activity-repository.server';
import type { IdNamePair, ValueDescPair } from '$lib/code/helper-types';
import { database } from '$lib/server/database.server';

const DEFAULT_SEARCH_LIMIT = 50;
const DEFAULT_DISTANCE_KM = 50;
const DEFAULT_LATITUDE = 51.1079;
const DEFAULT_LONGITUDE = 17.0385;
const METERS_PER_KILOMETER = 1000;

interface SearchActivitiesRow {
	id: number;
	name: string;
	description: string | null;
	map_url: string | null;
	website_url: string | null;
	start_date: string | null;
	end_date: string | null;
	targets: string[] | null;
	categories: string[] | null;
}

function nonEmptyOrUndefined(values?: string[]): string[] | undefined {
	return values && values.length > 0 ? values : undefined;
}

function rowToActivity(row: SearchActivitiesRow): ActivitySearchItem {
	return {
		id: row.id,
		name: row.name,
		description: row.description ?? '',
		mapUrl: row.map_url ?? '',
		url: row.website_url ?? '',
		startDate: row.start_date ? new Date(row.start_date) : null,
		endDate: row.end_date ? new Date(row.end_date) : null,
		categories: row.categories ?? [],
		targets: row.targets ?? []
	};
}

async function searchActivities(filters: ActivitySearchFilters): Promise<ActivitySearchItem[]> {
	const { data, error } = await database.rpc('search_activities', {
		p_name: filters.name || undefined,
		p_target_names: nonEmptyOrUndefined(filters.targets),
		p_category_names: nonEmptyOrUndefined(filters.categories),
		p_start_date: filters.startDate?.toISOString(),
		p_end_date: filters.endDate?.toISOString(),
		p_latitude: filters.latitude ?? DEFAULT_LATITUDE,
		p_longitude: filters.longitude ?? DEFAULT_LONGITUDE,
		p_distance_m:
			(filters.distance === undefined ? DEFAULT_DISTANCE_KM : filters.distance) *
			METERS_PER_KILOMETER,
		p_is_active: true,
		p_limit: filters.take ?? DEFAULT_SEARCH_LIMIT,
		p_offset: filters.offset ?? 0
	});

	if (error) {
		throw new Error(`Failed to search activities: ${error.message}`);
	}

	if (!Array.isArray(data)) {
		throw new Error('Failed to search activities: unexpected response shape');
	}

	return (data as SearchActivitiesRow[]).map(rowToActivity);
}

function getOptionalString(formData: FormData, key: string): string | undefined {
	const value = formData.get(key)?.toString().trim();
	return value ? value : undefined;
}

function getOptionalNumber(formData: FormData, key: string): number | undefined {
	const value = getOptionalString(formData, key);
	return value === undefined ? undefined : Number(value);
}

function getOptionalDate(formData: FormData, key: string): Date | undefined {
	const value = getOptionalString(formData, key);
	return value === undefined ? undefined : new Date(value);
}

function isInvalidNumber(value: number | undefined): boolean {
	return value !== undefined && !Number.isFinite(value);
}

function isInvalidDate(value: Date | undefined): boolean {
	return value !== undefined && Number.isNaN(value.getTime());
}

export const actions = {
	loadFiltersData: async () => {
		const [categories, targets] = await Promise.all([
			ActivityRepository.GetCategories(),
			ActivityRepository.GetTargets()
		]);

		// The search database function filters by names, so names are used as option values.
		return {
			categories: categories.map((category: IdNamePair): ValueDescPair => ({
				value: category.name,
				description: category.name
			})),
			targets: targets.map((target: IdNamePair): ValueDescPair => ({
				value: target.name,
				description: target.name
			}))
		};
	},
	searchActivities: async ({ request }) => {
		const formData = await request.formData();
		const filters: ActivitySearchFilters = {
			name: getOptionalString(formData, 'name'),
			distance: getOptionalNumber(formData, 'distance'),
			latitude: getOptionalNumber(formData, 'location-lat'),
			longitude: getOptionalNumber(formData, 'location-lng'),
			targets: formData.getAll('targets').map(String),
			categories: formData.getAll('categories').map(String),
			startDate: getOptionalDate(formData, 'startDate'),
			endDate: getOptionalDate(formData, 'endDate')
		};

		if (
			isInvalidNumber(filters.distance) ||
			(filters.distance !== undefined && filters.distance <= 0) ||
			isInvalidNumber(filters.latitude) ||
			isInvalidNumber(filters.longitude) ||
			isInvalidDate(filters.startDate) ||
			isInvalidDate(filters.endDate)
		) {
			return fail(400, { message: 'Invalid search filters' });
		}

		return { activities: await searchActivities(filters) };
	}
} satisfies Actions;
