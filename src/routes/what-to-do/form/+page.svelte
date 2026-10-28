<script lang="ts">
	import { onMount } from 'svelte';
	import { deserialize } from '$app/forms';
	import type { CalendarDate } from '@internationalized/date';
	import type { ActionResult } from '@sveltejs/kit';

	import { t } from '$lib/apps/what-to-do/labels';
	import type { ValueDescPair } from '$lib/code/helper-types';
	import DatePicker from '$lib/components/date-picker.svelte';
	import InputWithLabel from '$lib/components/input-with-label.svelte';
	import TogglePicker from '$lib/components/toggle-picker.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator';

	let categories = $state<ValueDescPair[]>([]);
	let targets = $state<ValueDescPair[]>([]);
	let dataLoaded = $state(false);
	let startDate = $state<CalendarDate | undefined>();
	let endDate = $state<CalendarDate | undefined>();
	let activity = $state({
		name: '',
		description: '',
		region: '',
		city: '',
		address: '',
		mapUrl: '',
		url: '',
		categories: [] as string[],
		targets: [] as string[]
	});

	async function loadData() {
		const response = await fetch('?/loadData', {
			method: 'POST',
			body: new FormData(),
			headers: { 'x-sveltekit-action': 'true' }
		});
		const result: ActionResult = deserialize(await response.text());
		if (result.type !== 'success') throw new Error('Loading activity form options failed');

		categories = result.data?.categories ?? [];
		targets = result.data?.targets ?? [];
	}

	function clearForm() {
		activity = {
			name: '',
			description: '',
			region: '',
			city: '',
			address: '',
			mapUrl: '',
			url: '',
			categories: [],
			targets: []
		};
		startDate = undefined;
		endDate = undefined;
	}

	onMount(async () => {
		try {
			await loadData();
			dataLoaded = true;
		} catch (error) {
			console.error('Failed to load activity form options.', error);
		}
	});
</script>

<div class="grid h-full grid-rows-1 gap-3 px-4 pb-4">
	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Title class="text-lg font-semibold">{t['act_add_title']}</Card.Title>
			<Separator orientation="horizontal" class="mt-1 mb-4" />
			<Card.Content class="flex flex-wrap gap-2 px-0 text-sm">
				<form method="POST" action="?/createActivity" class="flex w-full flex-wrap gap-2">
					<InputWithLabel
						id="name"
						name="name"
						label={t['act_add_name']}
						placeholder={t['act_add_name_ph']}
						bind:value={activity.name}
					/>
					<InputWithLabel
						id="description"
						name="description"
						label={t['act_add_description']}
						placeholder={t['act_add_description_ph']}
						bind:value={activity.description}
						multiline={true}
					/>
					<Separator orientation="horizontal" class="mt-1 mb-4" />
					<div class="flex w-full flex-wrap gap-3 lg:flex-nowrap">
						<InputWithLabel
							id="region"
							name="region"
							label={t['act_add_region']}
							placeholder={t['act_add_region_ph']}
							bind:value={activity.region}
						/>
						<InputWithLabel
							id="city"
							name="city"
							label={t['act_add_city']}
							placeholder={t['act_add_city_ph']}
							bind:value={activity.city}
						/>
						<InputWithLabel
							id="address"
							name="address"
							label={t['act_add_address']}
							placeholder={t['act_add_address_ph']}
							bind:value={activity.address}
						/>
					</div>
					<Separator orientation="horizontal" class="mt-1 mb-4" />
					<InputWithLabel
						id="map-url"
						name="mapUrl"
						label={t['act_add_map_url']}
						placeholder={t['act_add_link_ph']}
						bind:value={activity.mapUrl}
					/>
					<InputWithLabel
						id="website"
						name="url"
						label={t['act_add_website']}
						placeholder={t['act_add_link_ph']}
						bind:value={activity.url}
					/>
					<Separator orientation="horizontal" class="mt-1 mb-4" />
					<DatePicker
						id="start-date"
						name="startDate"
						label={t['act_add_date_from']}
						placeholder={t['act_add_date_ph']}
						bind:value={startDate}
					/>
					<DatePicker
						id="end-date"
						name="endDate"
						label={t['act_add_date_to']}
						placeholder={t['act_add_date_ph']}
						bind:value={endDate}
					/>
					<Separator orientation="horizontal" class="mt-1 mb-4" />
					<div class="flex w-full flex-wrap gap-2">
						{#if dataLoaded}
							<TogglePicker
								bind:value={activity.categories}
								id="categories"
								options={categories}
								label={t['act_add_categories']}
							/>
							{#each activity.categories as category (category)}
								<input type="hidden" name="categories" value={category} />
							{/each}
						{/if}
					</div>
					<Separator orientation="horizontal" class="mt-1 mb-4" />
					<div class="flex w-full flex-wrap gap-2">
						{#if dataLoaded}
							<TogglePicker
								bind:value={activity.targets}
								id="targets"
								options={targets}
								label={t['act_add_audience']}
							/>
							{#each activity.targets as target (target)}
								<input type="hidden" name="targets" value={target} />
							{/each}
						{/if}
					</div>
					<div class="w-full text-right">
						<Button variant="ghost" type="button" onclick={clearForm}
							>{t['act_add_clear_button']}</Button
						>
						<Button variant="default" type="submit" disabled={!dataLoaded}
							>{t['act_add_save_button']}</Button
						>
					</div>
				</form>
			</Card.Content>
		</Card.Header>
	</Card.Root>
</div>
