<script lang="ts">
	import './layout.css'
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  	import AppSidebar from "$lib/components/app-sidebar.svelte";
	import { ModeWatcher } from "mode-watcher"
	import favicon from '$lib/assets/favicon.svg'
	import MoonIcon from '@lucide/svelte/icons/moon'
	import SunIcon from '@lucide/svelte/icons/sun'
	import { toggleMode } from 'mode-watcher'
	import { Button } from '$lib/components/ui/button/index.js'
	import { Separator } from '$lib/components/ui/separator';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import type { AppData } from '$lib/components/app-sidebar-common';

	let { children } = $props();

	import { appsData } from '../apps/apps-configuration'
	import { gt } from "../apps/apps-global-labels"
	let activeApp = $state(appsData[0])
	function handleAppChange(app: AppData){
		activeApp = app
	}

</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />

<Sidebar.Provider>
  <AppSidebar apps={appsData} onAppChange={handleAppChange}/>
  <main class="w-full">
	<Sidebar.Inset>
		<header class="bg-muted sticky top-0 z-50 ">
			<div class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
				<div class="flex items-center w-full gap-2 px-4">
					<Sidebar.Trigger class="-ms-1" />
					<Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
					<Breadcrumb.Root>
						<Breadcrumb.List>
							<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="##">{gt["Apps"]}</Breadcrumb.Link>
							</Breadcrumb.Item>
							<Breadcrumb.Separator class="hidden md:block" />
							<Breadcrumb.Item>
							<Breadcrumb.Page>{activeApp.name}</Breadcrumb.Page>
							</Breadcrumb.Item>
						</Breadcrumb.List>
					</Breadcrumb.Root>
					<Button onclick={toggleMode} variant="outline" size="icon" class="ml-auto">
						<SunIcon class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 dark:scale-0" />
						<MoonIcon class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-0 dark:scale-100" />
						<span class="sr-only">{gt["Toggle theme"]}</span>
					</Button>
				</div>
			</div>
			<Separator orientation="horizontal"/>
		</header>
		<div class="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min pt-4">
			{@render children?.()}
		</div>
  	</Sidebar.Inset>
  </main>
</Sidebar.Provider>
