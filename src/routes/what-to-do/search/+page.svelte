<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance, deserialize } from '$app/forms';
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
	import type { CalendarDate } from '@internationalized/date';

	import { t } from '$lib/apps/what-to-do/labels';
	import type { ActivitySearchItem } from '$lib/apps/what-to-do/models/activity-search-item';
	import { formatDate } from '$lib/code/helper-functions';
	import type { ValueDescPair } from '$lib/code/helper-types';
	import DatePicker from '$lib/components/date-picker.svelte';
	import InputWithLabel from '$lib/components/input-with-label.svelte';
	import LocationPicker from '$lib/components/location-picker.svelte';
	import Select from '$lib/components/select.svelte';
	import TogglePopupPicker from '$lib/components/toggle-popup-picker.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton';

	const initialLocation = { lat: 51.1079, lng: 17.0385 };
	const defaultDistance = '25';
	const distances = [
		{ value: '5', label: '5 km' },
		{ value: '10', label: '10 km' },
		{ value: '15', label: '15 km' },
		{ value: '20', label: '20 km' },
		{ value: defaultDistance, label: '25 km' }
	];

	let categories = $state<ValueDescPair[]>([]);
	let targets = $state<ValueDescPair[]>([]);

	let name = $state<string | undefined>();
	let locationCoordinates = $state<{ lat: number; lng: number } | null>(null);
	let startDate = $state<CalendarDate | undefined>();
	let endDate = $state<CalendarDate | undefined>();
	let selectedCategories = $state<string[]>([]);
	let selectedTargets = $state<string[]>([]);
	let distance = $state<string>(defaultDistance);

	let filtersLoaded = $state(false);
	let activitySearchItems: ActivitySearchItem[] = $state([]);
	let searchFinished = $state(false);
	let searchNeverTriggered = $state(true);

	function clearFilters() {
		startDate = undefined;
		endDate = undefined;
		name = undefined;
		selectedCategories = [];
		selectedTargets = targets.map((target) => target.value);
		distance = defaultDistance;
	}

	const handleSearch: SubmitFunction = () => {
		searchNeverTriggered = false;
		searchFinished = false;

		return async ({ result }) => {
			if (result.type === 'success') {
				activitySearchItems = result.data?.activities ?? [];
			} else if (result.type === 'failure' || result.type === 'error') {
				activitySearchItems = [];
				alert('server error');
			}
			searchFinished = true;
		};
	};

	async function loadFiltersData() {
		const response = await fetch('?/loadFiltersData', {
			method: 'POST',
			body: new FormData(),
			headers: { 'x-sveltekit-action': 'true' }
		});
		const result: ActionResult = deserialize(await response.text());
		if (result.type !== 'success') throw new Error('Loading filters data failed');

		categories = result.data?.categories ?? [];
		targets = result.data?.targets ?? [];
	}

	onMount(async () => {
		try {
			await loadFiltersData();
			selectedTargets = targets.map((target) => target.value);
			locationCoordinates = initialLocation;
			filtersLoaded = true;
		} catch (error) {
			console.error('Failed to load activity search filters.', error);
		}
	});
</script>

<div class="grid grid-cols-1 grid-rows-[auto_1fr] gap-3 px-4">
	<div>
		{#if !filtersLoaded}
			<Card.Root class="@container/card">
				<Card.Header class="gap-4">
					<div class="flex flex-wrap gap-4">
						<Skeleton class="h-10 w-48" />
						<Skeleton class="h-10 w-56" />
						<Skeleton class="h-10 w-32" />
						<Skeleton class="h-10 w-40" />
						<Skeleton class="h-10 w-40" />
					</div>
					<div class="flex flex-wrap gap-4">
						<Skeleton class="h-10 w-48" />
						<Skeleton class="h-10 w-48" />
						<Skeleton class="h-9 w-32" />
					</div>
				</Card.Header>
			</Card.Root>
		{:else}
			<Card.Root class="@container/card">
				<Card.Content>
					<form
						method="POST"
						action="?/searchActivities"
						use:enhance={handleSearch}
						class="flex flex-wrap gap-4 px-0 text-sm"
					>
						<InputWithLabel
							id="name"
							name="name"
							label={t['act_search_name']}
							placeholder={t['act_search_name_ph']}
							bind:value={name}
						/>
						<LocationPicker
							id="location"
							name="location"
							label={t['act_search_location_label']}
							bind:value={locationCoordinates}
							initialCenter={initialLocation}
							popupHeader={t['act_search_location_p_head']}
							popupDescription={t['act_search_location_p_desc']}
							noLocationSelectedLabel={t['act_search_location_p_label']}
						/>
						<Select
							id="distance"
							name="distance"
							label={t['act_search_location_distance']}
							placeholder=""
							items={distances}
							bind:value={distance}
						/>
						<TogglePopupPicker
							bind:value={selectedTargets}
							id="targets"
							name="targets"
							options={targets}
							label={t['act_search_audience']}
						/>
						<TogglePopupPicker
							bind:value={selectedCategories}
							id="categories"
							name="categories"
							options={categories}
							label={t['act_search_categories']}
						/>
						<DatePicker
							id="start-date"
							name="startDate"
							label={t['act_search_date_from']}
							placeholder={t['act_search_date_ph']}
							bind:value={startDate}
						/>
						<DatePicker
							id="end-date"
							name="endDate"
							label={t['act_search_date_to']}
							placeholder={t['act_search_date_ph']}
							bind:value={endDate}
						/>
						<div class="w-full text-right">
							<Button variant="ghost" onclick={clearFilters}>{t['act_search_clear_button']}</Button>
							<Button
								variant="default"
								type="submit"
								disabled={!searchFinished && !searchNeverTriggered}
								>{t['act_search_search_button']}</Button
							>
						</div>
					</form>
				</Card.Content>
			</Card.Root>
		{/if}
	</div>
	<div class="grid grid-cols-1 grid-rows-2 gap-3 pb-15 md:grid-cols-2 lg:grid-cols-3">
		{#if !searchFinished && !searchNeverTriggered}
			{#each [0, 1, 2] as index (index)}
				<Card.Root class="@container/card">
					<Card.Header class="gap-3">
						<Skeleton class="h-6 w-3/4" />
						<Skeleton class="h-4 w-full" />
						<Skeleton class="h-4 w-5/6" />
						<div class="flex flex-wrap gap-1">
							<Skeleton class="h-5 w-16" />
							<Skeleton class="h-5 w-20" />
						</div>
						<div class="flex flex-wrap gap-1">
							<Skeleton class="h-5 w-20" />
							<Skeleton class="h-5 w-14" />
						</div>
						<Skeleton class="h-4 w-2/3" />
					</Card.Header>
				</Card.Root>
			{/each}
		{:else}
			{#each activitySearchItems as activity (activity.id)}
				<Card.Root class="@container/card">
					<Card.Header>
						<Card.Title class="text-lg font-semibold">{activity.name}</Card.Title>
						<Card.Description class="text-sm">
							<span class="mb-2">{activity.description}</span>
						</Card.Description>
						<div class="mb-3 flex flex-wrap gap-1">
							{#each activity.categories as category (category)}
								<Badge variant="secondary" class="text-xs">{category}</Badge>
							{/each}
						</div>
						<div class="mb-3 flex flex-wrap gap-1">
							{#each activity.targets as target (target)}
								<Badge variant="outline" class="text-xs">{target}</Badge>
							{/each}
						</div>
						<Card.Description class="text-xs text-muted-foreground">
							<span>Start: {formatDate(activity.startDate)}</span>
							<span>End: {formatDate(activity.endDate)}</span>
						</Card.Description>
					</Card.Header>
				</Card.Root>
			{/each}
		{/if}
	</div>
</div>
