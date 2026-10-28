<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    
    let { id, name, label, placeholder, items, value = $bindable<string>() }:
        { id: string, name?: string, label: string, placeholder: string, items: { value: string, label: string }[], value?: string } = $props();

    const displayValue = $derived(
        items.find((f) => f.value === value)?.label ?? placeholder
    );

</script>
 
<div class="flex flex-col gap-2">
    <Label class="ml-1" for="{id}-input">{label}</Label>
    <Select.Root type="single" {name} bind:value>
        <Select.Trigger>
            {displayValue}
        </Select.Trigger>
        <Select.Content>
        {#each items as item (item.value)}
            <Select.Item value={item.value}>{item.label}</Select.Item>
        {/each}
        </Select.Content>
    </Select.Root>
</div>  