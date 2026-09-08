<script lang="ts" module>
  // This is sample data.
  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
  };
</script>
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import NavMain from "./nav-main.svelte";
  import NavUser from "./nav-user.svelte";
  import AppSwitcher from "./app-switcher.svelte";
  import type { ComponentProps } from "svelte";
  import type { AppData } from './app-sidebar-common';

  let {
    ref = $bindable(null),
    collapsible = "icon",
    apps = [],
    onAppChange, 
    ...restProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: ComponentProps<typeof Sidebar.Root> & { apps: AppData[], onAppChange?: any } = $props();

  let activeApp = $state(apps[0])

  function handleAppChange(app: AppData) {
    activeApp = app
    if (onAppChange) onAppChange(app)
  }
</script>
<Sidebar.Root bind:ref {collapsible} {...restProps}>
  <Sidebar.Header>
    <AppSwitcher apps={apps} onAppChange={handleAppChange}/>
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMain items={activeApp.navigation} />
  </Sidebar.Content>
  <Sidebar.Footer>
    <!-- <NavUser user={data.user} /> -->
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>