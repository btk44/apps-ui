import type { Actions } from './$types';

import { ActivityService } from '$lib/apps/what-to-do/server/activity-service.server';
import type { IdNamePair, ValueDescPair } from '$lib/code/helper-types';

export const actions = {
	loadFiltersData: async () => {
		const [categories, targets] = await Promise.all([
			ActivityService.GetCategories(),
			ActivityService.GetTargets()
		]);

		await new Promise((resolve) => setTimeout(resolve, 500));

		return {
			categories: categories.map((category: IdNamePair): ValueDescPair => ({
				value: String(category.id),
				description: category.name
			})),
			targets: targets.map((target: IdNamePair): ValueDescPair => ({
				value: String(target.id),
				description: target.name
			}))
		};
	},
	searchActivities: async ({ request }) => {
		await new Promise((resolve) => setTimeout(resolve, 500));

		const formData = await request.formData();
		const startDate = formData.get('startDate')?.toString();
		const endDate = formData.get('endDate')?.toString();
		const filters = {
			name: formData.get('name')?.toString(),
			distance: Number(formData.get('distance')),
			latitude: Number(formData.get('location-lat')),
			longitude: Number(formData.get('location-lng')),
			targets: formData.getAll('targets').map(String),
			categories: formData.getAll('categories').map(String),
			startDate: startDate ? new Date(startDate) : undefined,
			endDate: endDate ? new Date(endDate) : undefined
		};

		return { activities: await ActivityService.SearchActivities(filters) };
	}
} satisfies Actions;
