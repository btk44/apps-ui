<script lang="ts">
	import { deserialize, enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import type { CalendarDate } from '@internationalized/date';
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';

	import type { PageProps } from './$types';

	import { t } from '$lib/apps/what-to-do/labels';
	import DatePicker from '$lib/components/date-picker.svelte';
	import InputWithLabel from '$lib/components/input-with-label.svelte';
	import LocationPicker from '$lib/components/location-picker.svelte';
	import TogglePopupPicker from '$lib/components/toggle-popup-picker.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	const initialLocation = { lat: 51.1079, lng: 17.0385 };

	let { form }: PageProps = $props();
	let saving = $state(false);
	let locationCoordinates = $state<{ lat: number; lng: number } | null>(null);
	let startDate = $state<CalendarDate | undefined>();
	let endDate = $state<CalendarDate | undefined>();
	let selectedTargets = $state<string[]>([]);
	let selectedCategories = $state<string[]>([]);
	let filtersLoading = $state(true);
	let targetOptions = $state<{ value: string; description: string }[]>([]);
	let categoryOptions = $state<{ value: string; description: string }[]>([]);
	let activity = $state({
		name: '',
		description: '',
		region: '',
		city: '',
		address: '',
		mapUrl: '',
		url: ''
	});

	function getFieldError(field: string): string | undefined {
		return (form?.errors as Record<string, string> | undefined)?.[field];
	}

	function clearForm() {
		activity = {
			name: '',
			description: '',
			region: '',
			city: '',
			address: '',
			mapUrl: '',
			url: ''
		};
		startDate = undefined;
		endDate = undefined;
		locationCoordinates = null;
		selectedTargets = [];
		selectedCategories = [];
	}

	const handleCreate: SubmitFunction = () => {
		saving = true;
		return async ({ result, update }) => {
			try {
				await update({ reset: false });
				if (result.type === 'success') clearForm();
			} finally {
				saving = false;
			}
		};
	};

	onMount(async () => {
		const formData = new FormData();
		const response = await fetch('?/loadFormData', {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());
		if (result.type !== 'success') throw new Error('Loading filters data failed');

		categoryOptions = result.data?.categories ?? [];
		targetOptions = result.data?.targets ?? [];

		filtersLoading = false;
	});
</script>

<div class="grid h-full grid-rows-1 gap-3 px-4 pb-4">
	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Title class="text-lg font-semibold">{t['act_add_title']}</Card.Title>
			<Separator orientation="horizontal" class="mt-1 mb-4" />
			<Card.Content class="flex flex-wrap gap-2 px-0 text-sm">
				<form
					method="POST"
					action="?/createActivity"
					use:enhance={handleCreate}
					class="flex w-full flex-wrap gap-2"
					aria-busy={saving}
				>
					{#if form?.message}
						<p role="alert" class="w-full text-destructive">{form.message}</p>
					{:else if form?.success}
						<p role="status" class="w-full">{t.act_add_save_success}</p>
					{/if}
					<fieldset disabled={saving} class="flex w-full min-w-0 flex-wrap gap-2">
						<InputWithLabel
							id="name"
							name="name"
							label={t['act_add_name']}
							placeholder={t['act_add_name_ph']}
							bind:value={activity.name}
							errorLabel={getFieldError('name')}
						/>
						<InputWithLabel
							id="description"
							name="description"
							label={t['act_add_description']}
							placeholder={t['act_add_description_ph']}
							bind:value={activity.description}
							errorLabel={getFieldError('description')}
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
								errorLabel={getFieldError('region')}
							/>
							<InputWithLabel
								id="city"
								name="city"
								label={t['act_add_city']}
								placeholder={t['act_add_city_ph']}
								bind:value={activity.city}
								errorLabel={getFieldError('city')}
							/>
							<InputWithLabel
								id="address"
								name="address"
								label={t['act_add_address']}
								placeholder={t['act_add_address_ph']}
								bind:value={activity.address}
								errorLabel={getFieldError('address')}
							/>
						</div>
						<LocationPicker
							id="activity-location"
							name="location"
							label={t.act_add_location}
							popupHeader={t.act_add_location_header}
							popupDescription={t.act_add_location_description}
							noLocationSelectedLabel={t.act_add_no_location}
							initialCenter={initialLocation}
							bind:value={locationCoordinates}
						/>
						<Separator orientation="horizontal" class="mt-1 mb-4" />
						<InputWithLabel
							id="map-url"
							name="mapUrl"
							label={t['act_add_map_url']}
							placeholder={t['act_add_link_ph']}
							bind:value={activity.mapUrl}
							errorLabel={getFieldError('mapUrl')}
						/>
						<InputWithLabel
							id="website"
							name="url"
							label={t['act_add_website']}
							placeholder={t['act_add_link_ph']}
							bind:value={activity.url}
							errorLabel={getFieldError('url')}
						/>
						<Separator orientation="horizontal" class="mt-1 mb-4" />
						{#if filtersLoading}
							<div class="flex flex-col gap-2">
								<Label class="ml-1">{t['act_add_audience']}</Label>
								<Skeleton class="h-10 w-full" />
							</div>
							<div class="flex flex-col gap-2">
								<Label class="ml-1">{t['act_add_categories']}</Label>
								<Skeleton class="h-10 w-full" />
							</div>
						{:else}
							<TogglePopupPicker
								id="targets"
								name="targets"
								label={t['act_add_audience']}
								options={targetOptions}
								bind:value={selectedTargets}
							/>
							<TogglePopupPicker
								id="categories"
								name="categories"
								label={t['act_add_categories']}
								options={categoryOptions}
								bind:value={selectedCategories}
							/>
						{/if}
						<Separator orientation="horizontal" class="mt-1 mb-4" />
						<DatePicker
							id="start-date"
							name="startDate"
							label={t['act_add_date_from']}
							placeholder={t['act_add_date_ph']}
							bind:value={startDate}
							errorLabel={getFieldError('startDate')}
						/>
						<DatePicker
							id="end-date"
							name="endDate"
							label={t['act_add_date_to']}
							placeholder={t['act_add_date_ph']}
							bind:value={endDate}
							errorLabel={getFieldError('endDate')}
						/>
						<div class="w-full text-right">
							<Button variant="ghost" type="button" onclick={clearForm}
								>{t['act_add_clear_button']}</Button
							>
							<Button variant="default" type="submit"
								>{saving ? t.act_add_saving : t['act_add_save_button']}</Button
							>
						</div>
					</fieldset>
				</form>
			</Card.Content>
		</Card.Header>
	</Card.Root>
</div>
