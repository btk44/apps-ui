<script lang="ts">
	import { onMount } from "svelte";

	import type {ActivitySearchItem} from "../models/activity-search-item"
	import { ActivityService } from "../services/activity-service";
	import { categoriesStoreReadOnly, initDataStore, targetsStoreReadOnly } from "../store";

	import {t} from "../labels"

	import { formatDate } from "$lib/code/helper-functions";
	import type { CalendarDate } from "@internationalized/date";

	import { Badge } from '$lib/components/ui/badge'
	import LocationPicker from "$lib/components/location-picker.svelte";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import Select from "$lib/components/select.svelte";
	import DatePicker from "$lib/components/date-picker.svelte";
	import InputWithLabel from "$lib/components/input-with-label.svelte";
	import * as Card from "$lib/components/ui/card/index.js"
	import TogglePicker from "$lib/components/toggle-picker.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import TogglePopupPicker from "$lib/components/toggle-popup-picker.svelte";

    let initDataLoaded = $state(false)
	let categories = $state($categoriesStoreReadOnly)
	let targets = $state($targetsStoreReadOnly)

	categoriesStoreReadOnly.subscribe((data) => {categories = data})
	targetsStoreReadOnly.subscribe((data) => {targets = data})

	let location_coords = $state<{ lat: number; lng: number } | null>(null)
	const initalLocation = { lat: 51.1079, lng: 17.0385 }
	let name = $state<string | undefined>();
	let startDate = $state<CalendarDate | undefined>()
	let endDate = $state<CalendarDate | undefined>()
	let selectedCategories = $state<string[]>([])
	let selectedTargets = $state<string[]>([])
	let distance = $state<string>("25")
	const distances = [
        { value: "5", label: "5 km" },
        { value: "10", label: "10 km" },
        { value: "15", label: "15 km" },
        { value: "20", label: "20 km" },
        { value: "25", label: "25 km" }
    ];

	let activitySearchItems: ActivitySearchItem[] = $state([])
	let searchFinished = $state(false)
	let searchNeverTriggered = $state(true)

	function clearFilters(){
		startDate = undefined
		endDate = undefined
		name = undefined
		selectedCategories = []
		selectedTargets = targets.map(x => x.value)
		distance = "25"
	}

	 async function triggerSearch(){
		try {
			searchNeverTriggered = false;
			searchFinished = false
			await new Promise(r => setTimeout(r, 2000));
			activitySearchItems = await ActivityService.SearchActivities()
		}
		catch{ alert('server error') }
		finally{ searchFinished = true }
	}

	// $effect(() => {
	// 	(async () => {
	// 		try {
	// 			searchFinished = false
	// 			await new Promise(r => setTimeout(r, 2000));
	// 			activitySearchItems = await ActivityService.SearchActivities()
	// 		}
	// 		catch{ alert('server error') }
	// 		finally{ searchFinished = true }
	// 	})()
	// });

	onMount(async () => { 
        try{
            await initDataStore(true)
			selectedTargets = targets.map(x => x.value)
			location_coords = initalLocation
            initDataLoaded = true
        }
        catch{
            initDataLoaded = false
        }
    })

	
</script>

<div class="grid grid-rows-[auto_1fr] gap-3 grid-cols-1 px-4">
	<div >
		{#if !initDataLoaded}
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
			<Card.Header>
				<Card.Content class="text-sm flex gap-4 flex-wrap px-0">
					<InputWithLabel id="name" label={t["act_search_name"]} placeholder={t["act_search_name_ph"]} bind:value={name}/>
					<LocationPicker id="location" label={t["act_search_location_label"]} bind:value={location_coords} 
									initialCenter={initalLocation} popupHeader={t["act_search_location_p_head"]} popupDescription={t["act_search_location_p_desc"]} 
									noLocationSelectedLabel={t["act_search_location_p_label"]} />
					<Select id="distance" label={t["act_search_location_distance"]} placeholder="" items={distances} bind:value={distance} />
					<TogglePopupPicker bind:value={selectedTargets} id="targets" options={targets} label={t["act_search_audience"]} />
					<TogglePopupPicker bind:value={selectedCategories} id="categories" options={categories} label={t["act_search_categories"]} />
					<DatePicker id="start-date" label={t["act_search_date_from"]} placeholder={t["act_search_date_ph"]} bind:value={startDate}/>
					<DatePicker id="end-date" label={t["act_search_date_to"]} placeholder={t["act_search_date_ph"]} bind:value={endDate}/>
					<div class="w-full text-right">
						<Button variant="ghost" onclick={clearFilters}>{t["act_search_clear_button"]}</Button>
						<Button variant="default" onclick={triggerSearch}>{t["act_search_search_button"]}</Button>
					</div>
				</Card.Content>
			</Card.Header>
		</Card.Root>
		{/if}
	</div>
	<div class="grid grid-rows-2 grid-cols-1 gap-3 pb-15 md:grid-cols-2 lg:grid-cols-3 ">
		{#if !searchFinished && !searchNeverTriggered}
			{#each Array(3) as _, index (index)}
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
				<Card.Title class="font-semibold text-lg">{activity.name}</Card.Title>
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
