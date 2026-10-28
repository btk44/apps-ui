import type { Actions } from './$types';

import { ActivityService } from '$lib/apps/what-to-do/server/activity-service.server';
import type { IdNamePair, ValueDescPair } from '$lib/code/helper-types';

export const actions = {
    loadData: async () => {
        const [categories, targets] = await Promise.all([
            ActivityService.GetCategories(),
            ActivityService.GetTargets()
        ]);

        await new Promise((resolve) => setTimeout(resolve, 2000));

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
    createActivity: async () => { }
} satisfies Actions;