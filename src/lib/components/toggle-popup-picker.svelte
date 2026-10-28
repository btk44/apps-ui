<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import XIcon from "@lucide/svelte/icons/x";
  import CheckIcon from "@lucide/svelte/icons/check";
	import TogglePicker from "./toggle-picker.svelte";

  let { id, name, options, label, value = $bindable<string[]>(), onValueChange }: 
      { id:string, name?: string, options: {value: string, description: string}[], label: string,
        value?: string[], onValueChange?: (values: string[]) => void } = $props()

  function handleValueChange(values: string[]) {
      if (onValueChange)
          onValueChange(values) // this is array of values
  }

  function formatPlaceholder(value: string[]){
    if(!value || !value.length) return "..."

    let firstOption = options.find(x => x.value == value[0])?.description
    if (value.length === 1) return firstOption
    else return `${firstOption} , +${value.length - 1}`
  }

  let open = $state(false);
  function confirm() { open = false; }
  function cancel() { open = false; }
</script>

<div class="flex flex-col gap-2">
    <Label class="ml-1" for="{id}-input">{label}</Label>
    {#if name}
        {#each value ?? [] as selected (selected)}
            <input type="hidden" {name} value={selected} />
        {/each}
    {/if}
    <Button variant="outline" onclick={() => (open = true)}>
        {formatPlaceholder(value)}
    </Button>
</div>

<Dialog.Root bind:open>
  <Dialog.Content class="sm:max-w-2xl">
    <!-- <Dialog.Header>
      <Dialog.Title></Dialog.Title>
    </Dialog.Header> -->
    
    <TogglePicker bind:value={value} id="categories" options={options} label={label} onValueChange={handleValueChange} />

    <Dialog.Footer>
      <Button variant="ghost" onclick={cancel} hidden class="w-20"><XIcon/></Button>
      <Button onclick={confirm} class="w-20"><CheckIcon/></Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>