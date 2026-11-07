import type { IdNamePair } from '$lib/code/helper-types';
import { database } from '$lib/server/database.server';

async function getIdNamePairs(table: string): Promise<IdNamePair[]> {
	const { data, error } = await database
		.from(table)
		.select('id, name')
		.order('id')
		.overrideTypes<IdNamePair[], { merge: false }>();

	if (error) {
		throw new Error(`Failed to load ${table}: ${error.message}`);
	}

	return data;
}

export const ActivityRepository = {
	GetCategories: (): Promise<IdNamePair[]> => getIdNamePairs('categories'),
	GetTargets: (): Promise<IdNamePair[]> => getIdNamePairs('targets')
};
