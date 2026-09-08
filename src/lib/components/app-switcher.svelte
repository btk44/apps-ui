<script lang="ts">
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down"
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js"
  import * as Sidebar from "$lib/components/ui/sidebar/index.js"
  import { useSidebar } from "$lib/components/ui/sidebar/index.js"
	import type { AppData } from "$lib/components/app-sidebar-common"
  // This should be `Component` after @lucide/svelte updates types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let { apps, onAppChange }: { apps: AppData[], onAppChange: any } = $props()
  const sidebar = useSidebar()
  // svelte-ignore state_referenced_locally
  let activeApp = $state(apps[0])
  function handleAppChange(app: AppData) {
    activeApp = app
    if (onAppChange) onAppChange(app)
  }
</script>
<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton
            {...props}
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <activeApp.logo class="size-4" />
            </div>
            <div class="grid flex-1 text-start text-sm leading-tight">
              <span class="truncate font-medium">
                {activeApp.name}
              </span>
              <span class="truncate text-xs">{activeApp.description}</span>
            </div>
            <ChevronsUpDownIcon class="ms-auto" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
        align="start"
        side={sidebar.isMobile ? "bottom" : "right"}
        sideOffset={4}
      >
        <DropdownMenu.Label class="text-xs text-muted-foreground">Apps</DropdownMenu.Label>
        {#each apps as app (app.name)}
          <DropdownMenu.Item onSelect={() => handleAppChange(app)} class="gap-2 p-2">
            <div class="flex size-6 items-center justify-center rounded-md border">
              <app.logo class="size-3.5 shrink-0" />
            </div>
            {app.name}
          </DropdownMenu.Item>
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>