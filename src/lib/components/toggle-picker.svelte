<script lang="ts">
    import CircleIcon from "@lucide/svelte/icons/circle";
    import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    let { id, options, label, onValueChange }: 
        { id:string, options: {value: string, description: string}[], label: string, 
                               onValueChange: (values: string[]) => void } = $props()

    let selected = $state<string[]>([]);
    export function reset(): void {
        selected = [];
        if (onValueChange)
            onValueChange(selected);
    }

    function handleValueChange(values: string[]) {
        if (onValueChange)
            onValueChange(values) // this is array of values
    }
</script>
 
<div class="flex flex-col gap-2">
    <Label class="ml-1" for="{id}-input">{label}</Label>
    <ToggleGroup.Root id={id} bind:value={selected} 
        type="multiple" variant="outline" spacing={2} size="default" class="flex flex-wrap w-full"
        onValueChange={handleValueChange} >
        {#each options as option (option.value)}
        <ToggleGroup.Item
            value={option.value}
            
            aria-label={option.description}
            class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-primary data-[state=on]:*:[svg]:stroke-primary">
            <CircleIcon />
            {option.description}
        </ToggleGroup.Item>
    {/each}
    </ToggleGroup.Root>
</div>