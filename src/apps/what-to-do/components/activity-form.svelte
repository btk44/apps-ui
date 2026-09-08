<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js"
	import DatePicker from "$lib/components/date-picker.svelte";
	import InputWithLabel from "$lib/components/input-with-label.svelte";
	import TogglePicker from "$lib/components/toggle-picker.svelte";
	import type { CalendarDate } from "@internationalized/date";
	import Button from "$lib/components/ui/button/button.svelte";
	import {t} from "../labels"
	import { ActivityService } from "../services/activity-service";
	import { Separator } from "$lib/components/ui/separator";
	import type { ActivityInput } from "../models/activity-input";

    let data: ActivityInput = $state({})

	let categories = [{value: "cat1", description: "museum"}, {value: "cat2", description: "park"}, {value: "cat3", description: "concert"}]
	let targets = [{value: "t1", description: "adults"}, {value: "t2", description: "children"}, {value: "t3", description: "families"}]

	function updateCategories(selections: string[]) { data.categories = selections }

	function updateTargets(selections: string[]) { data.targets = selections }

	function clearForm(){
        console.log(data)
		startDate = undefined
		endDate = undefined
		name = undefined
		categoriesToggle.reset()
		targetsToggle.reset()
	}

	 async function triggerSave(){
		try {
			await new Promise(r => setTimeout(r, 2000));
		}
		catch{ alert('server error') }
		finally{ let x = 0 }
	}

	let name = $state<string | undefined>(); 
	let startDate = $state<CalendarDate | undefined>();
	let endDate = $state<CalendarDate | undefined>();
	let categoriesToggle: TogglePicker;
	let targetsToggle: TogglePicker;
</script>

<div class="grid h-full grid-rows-1 gap-3 px-4 pb-4">
    <Card.Root class="@container/card">
        <Card.Header>
            <Card.Title class="font-semibold text-lg">Wprowadź nową aktywność</Card.Title>
            <Separator orientation="horizontal" class="mt-1 mb-4" />
            <Card.Content class="text-sm flex gap-2 flex-wrap px-0">
                <InputWithLabel id="name" label={t["Name"]} placeholder={t["input part of the name"]} bind:value={data.name}/>
                <InputWithLabel id="description" label="Opis" placeholder="test" bind:value={data.description} multiline={true}/>
                <Separator orientation="horizontal" class="mt-1 mb-4" />
				<div class="flex w-full flex-wrap gap-3 lg:flex-nowrap">
                    <InputWithLabel id="region" label="Województwo" placeholder="..." bind:value={data.region}/>
                    <InputWithLabel id="city" label="Miejscowość" placeholder="..." bind:value={data.city} />
                    <InputWithLabel id="address" label="Adres" placeholder="..." bind:value={data.address} />
                </div>
                <Separator orientation="horizontal" class="mt-1 mb-4" />
                <InputWithLabel id="map-url" label="Link do mapy" placeholder="..." bind:value={data.mapUrl} />
                <InputWithLabel id="website" label="Link do mapy" placeholder="..." bind:value={data.url} />
                <Separator orientation="horizontal" class="mt-1 mb-4" />
                <DatePicker id="start-date" label={t["Start date"]} placeholder={t["pick a date"]} bind:value={startDate}/>
                <DatePicker id="end-date" label={t["End date"]} placeholder={t["pick a date"]} bind:value={endDate}/>
                <Separator orientation="horizontal" class="mt-1 mb-4" />
                <TogglePicker bind:this={categoriesToggle} id="categories" options={categories} label={t["Categories"]} onValueChange={updateCategories}/>
                <Separator orientation="horizontal" class="mt-1 mb-4" />
                <TogglePicker bind:this={targetsToggle} id="targets" options={targets} label={t["Target audience"]} onValueChange={updateTargets}/>
                <div class="w-full text-right">
                    <Button variant="ghost" onclick={clearForm}>{t["Clear"]}</Button>
                    <Button variant="default" onclick={triggerSave}>{t["Save"]}</Button>
                </div>
            </Card.Content>
        </Card.Header>
    </Card.Root>
</div>
