<script lang="ts">
 import Input from "$lib/components/ui/input/input.svelte";
 import { Textarea } from "$lib/components/ui/textarea/index.js";
 import { Label } from "$lib/components/ui/label/index.js";
 
 let { id, label, placeholder, multiline, value = $bindable<string | undefined>() }:
     { id: string, label: string, placeholder: string, multiline?: boolean, value?: string } = $props();

</script>
 
<div class="flex flex-col gap-2 w-full">
    <Label class="ml-1" for="{id}-input">{label}</Label>
    {#if !multiline}
    <Input id="{id}-input" bind:value type="text" placeholder={placeholder} class="w-full" />
    {:else}
    <Textarea id="{id}-input" bind:value placeholder={placeholder} />
    {/if}
</div>  