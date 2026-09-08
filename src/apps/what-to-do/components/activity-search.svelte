<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js"
	import { Badge } from '$lib/components/ui/badge'
	import DatePicker from "$lib/components/date-picker.svelte";
	import InputWithLabel from "$lib/components/input-with-label.svelte";
	import TogglePicker from "$lib/components/toggle-picker.svelte";
	import type { CalendarDate } from "@internationalized/date";
	import Button from "$lib/components/ui/button/button.svelte";
	import {t} from "../labels"
	import type {ActivitySearchItem} from "../models/activity-search-item"
	import { ActivityService } from "../services/activity-service";
	import { Skeleton } from "$lib/components/ui/skeleton";

	function formatDate(date: Date): string {
		return new Date(date).toLocaleDateString('en-GB', { 
			month: 'short', 
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		})
	}

	let categories = [{value: "cat1", description: "museum"}, {value: "cat2", description: "park"}, {value: "cat3", description: "concert"}]
	let targets = [{value: "t1", description: "adults"}, {value: "t2", description: "children"}, {value: "t3", description: "families"}]

	function updateCategoriesFilter(selections: string[]){
		// console.log(selections)
	}

	function updateTargetsFilter(selections: string[]){
		// console.log(selections)

		let start = startDate?.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone)
		let end = endDate?.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone)
		if (end){
			end.setHours(23)
			end.setMinutes(59)
			end.setSeconds(59)
		}

		// console.log(start)
		// console.log(end)
		// console.log(name)
	}

	function clearFilters(){
		startDate = undefined
		endDate = undefined
		name = undefined
		categoriesToggle.reset()
		targetsToggle.reset()
	}

	 async function triggerSearch(){
		try {
			dataLoaded = false
			await new Promise(r => setTimeout(r, 2000));
			activitySearchItems = await ActivityService.SearchActivities()
		}
		catch{ alert('server error') }
		finally{ dataLoaded = true }
	}

	let name = $state<string | undefined>(); 
	let startDate = $state<CalendarDate | undefined>();
	let endDate = $state<CalendarDate | undefined>();
	let categoriesToggle: TogglePicker;
	let targetsToggle: TogglePicker;

	let activitySearchItems: ActivitySearchItem[] = $state([])
	let dataLoaded = $state(false)

	$effect(() => {
		(async () => {
			try {
				dataLoaded = false
				await new Promise(r => setTimeout(r, 2000));
				activitySearchItems = await ActivityService.SearchActivities()
			}
			catch{ alert('server error') }
			finally{ dataLoaded = true }
		})()
	});
</script>

<div class="grid grid-rows-[auto_1fr] gap-3 grid-cols-1 px-4">
	<div >
		<Card.Root class="@container/card">
			<Card.Header>
				<!-- <Card.Title class="font-semibold text-lg">Filters</Card.Title>
				<Separator orientation="horizontal" class="mt-1 mb-4" /> -->
				<Card.Content class="text-sm flex gap-2 flex-wrap px-0">
					<InputWithLabel id="name" label={t["Name"]} placeholder={t["input part of the name"]} bind:value={name}/>
					<DatePicker id="start-date" label={t["Start date"]} placeholder={t["pick a date"]} bind:value={startDate}/>
					<DatePicker id="end-date" label={t["End date"]} placeholder={t["pick a date"]} bind:value={endDate}/>
					<TogglePicker bind:this={categoriesToggle} id="categories" options={categories} label={t["Categories"]} onValueChange={updateCategoriesFilter}/>
					<TogglePicker bind:this={targetsToggle} id="targets" options={targets} label={t["Target audience"]} onValueChange={updateTargetsFilter}/>
					<div class="w-full text-right">
						<Button variant="ghost" onclick={clearFilters}>{t["Clear"]}</Button>
						<Button variant="default" onclick={triggerSearch}>{t["Search"]}</Button>
					</div>
				</Card.Content>
			</Card.Header>
		</Card.Root>
	</div>
	<div class="grid grid-rows-2 grid-cols-1 gap-3 pb-15 md:grid-cols-2 lg:grid-cols-3 ">
		{#if !dataLoaded}
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
