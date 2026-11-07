<script lang="ts">
 import Input from "$lib/components/ui/input/input.svelte";
 import { Textarea } from "$lib/components/ui/textarea/index.js";
 import { Label } from "$lib/components/ui/label/index.js";
 
 let { id, name, label, errorLabel, placeholder, multiline, value = $bindable<string | undefined>() }:
     { id: string, name?: string, label: string, errorLabel?: string, placeholder: string, multiline?: boolean, value?: string } = $props();

</script>
 
<div class="flex flex-col gap-2 w-full">
    <Label class="ml-1" for="{id}-input">{label}</Label>
    {#if !multiline}
    <Input id="{id}-input" {name} bind:value type="text" placeholder={placeholder} class={[errorLabel && errorLabel.length && "border-destructive", "w-full"]} />
    {:else}
    <Textarea id="{id}-input" {name} bind:value placeholder={placeholder} class={[errorLabel && errorLabel.length && "border-destructive"]} />
    {/if}
    {#if errorLabel && errorLabel.length}
        <Label class="ml-2 text-xs text-destructive" for="{id}-input">{errorLabel}</Label>
    {/if}
</div>  