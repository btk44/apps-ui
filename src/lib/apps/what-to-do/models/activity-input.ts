export interface ActivityInput {
	name: string;
	description?: string;
	countryCode?: string;
	region?: string;
	city?: string;
	address?: string;
	latitude: number;
	longitude: number;
	activityType?: 'place' | 'activity' | 'event';
	mapUrl?: string;
	url?: string;
	startDate?: Date;
	endDate?: Date;
	active?: boolean;
}

export interface CreatedActivity extends ActivityInput {
	id: number;
	activityType: 'place' | 'activity' | 'event';
	active: boolean;
	version: number;
	createdAt: Date;
	updatedAt: Date;
}
