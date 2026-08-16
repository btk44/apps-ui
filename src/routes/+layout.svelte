<script lang="ts">
	import './layout.css'
	import { ModeWatcher } from "mode-watcher"
	import favicon from '$lib/assets/favicon.svg'
	import MoonIcon from '@lucide/svelte/icons/moon'
	import SunIcon from '@lucide/svelte/icons/sun'
	import CircleEuro from '@lucide/svelte/icons/circle-euro'
	import { toggleMode } from 'mode-watcher'
	import { Button } from '$lib/components/ui/button/index.js'

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />

<header class="sticky top-0 z-40 w-full border-b bg-background">
	<div class="container flex h-14 p-3 justify-between">
		<div class="flex items-center space-x-2">
			<Button variant="outline" size="icon">
				<CircleEuro class="h-[1.2rem] w-[1.2rem]" />
			</Button>
			<span class="font-bold">Expenses</span>
		</div>
		<Button onclick={toggleMode} variant="outline" size="icon">
			<SunIcon class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 dark:scale-0" />
			<MoonIcon class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-0 dark:scale-100" />
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
</header>
{@render children()}
