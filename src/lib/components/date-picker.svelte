<script lang="ts">
 import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
 import {
  getLocalTimeZone,
  type CalendarDate
 } from "@internationalized/date";
 import * as Popover from "$lib/components/ui/popover/index.js";
 import Calendar from "$lib/components/ui/calendar/calendar.svelte";
 import { Button } from "$lib/components/ui/button/index.js";
 import { Label } from "$lib/components/ui/label/index.js";
 
 let {
  id,
  label,
  placeholder,
  value = $bindable<CalendarDate | undefined>()
 }: {
  id: string;
  label: string;
  placeholder: string;
  value?: CalendarDate;
 } = $props();
 
 let open = $state(false);
</script>
 
<div class="flex flex-col gap-2">
 <Label class="ml-1" for="{id}-date">{label}</Label>
 <Popover.Root bind:open>
  <Popover.Trigger id="{id}-date">
   {#snippet child({ props })}
    <Button
     {...props}
     variant="outline"
     class="w-48 justify-between font-normal"
    >
     {value
      ? value.toDate(getLocalTimeZone()).toLocaleDateString()
      : placeholder}
     <ChevronDownIcon />
    </Button>
   {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-auto overflow-hidden p-0" align="start">
   <Calendar
    type="single"
    bind:value
    captionLayout="dropdown"
    onValueChange={() => {
        open = false
    }}
   />
  </Popover.Content>
 </Popover.Root>
</div>