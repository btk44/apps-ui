<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js"
	import { accounts, categories, currencies, transactions } from "../models/mock-data"
	// import * as Table from "$lib/components/ui/table/index.js"
	// import { Button } from "./ui/button"
	import { Badge } from '$lib/components/ui/badge'
	import FunnelIcon from '@lucide/svelte/icons/funnel'
	import PlusIcon from '@lucide/svelte/icons/plus'
	import TrendingDownIcon from '@lucide/svelte/icons/trending-down'
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up'
	import { Button } from '$lib/components/ui/button'

	const transactionCards = transactions.map((transaction) => {
		const account = accounts.find((item) => item.id === transaction.accountId)
		const category = categories.find((item) => item.id === transaction.categoryId)
		const currency = currencies.find((item) => item.id === account?.currencyId)

		return {
			...transaction,
			accountName: account?.name ?? "Unknown account",
			categoryName: category?.name ?? "Unknown category",
			currencyCode: currency?.code ?? "USD",
			currencyDecimals: currency?.decimals ?? 2
		}
	})

	function formatAmount(amount: number, direction: string, decimals: number, currencyCode?: string): string {
		const prefix = direction === "credit" ? "+" : "-";
		return `${prefix}${amount.toFixed(decimals)}` + (currencyCode ? ` ${currencyCode}` : "");
	}
</script>

<div
	class="grid grid-cols-1 gap-4 px-4 pb-24 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card"
>
	{#each transactionCards as transaction (transaction.id)}
		<Card.Root class="@container/card">
			<Card.Header>
				<Card.Action>
					<Badge variant="outline">
						{#if transaction.direction === "credit"}
							<TrendingDownIcon /> 
						{:else}
							<TrendingUpIcon />
						{/if}
					</Badge>
				</Card.Action>
				<Card.Description class="font-semibold">{transaction.accountName}</Card.Description>
				<Card.Title class="font-semibold tabular-nums @[250px]/card:text-2xl text-end">
					{formatAmount(transaction.amount, 
									transaction.direction, 
									transaction.currencyDecimals,
									transaction.currencyCode) }
				</Card.Title>
				<Card.Description>
					<div class="font-semibold">
						{transaction.categoryName}
					</div>
					<div class="">{transaction.comment}</div>
				</Card.Description>
			</Card.Header>
		</Card.Root>
	{/each}

	<div class="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-end px-4">
		<div class="pointer-events-auto flex items-center gap-3 border border-border bg-background/90 p-2 shadow-lg backdrop-blur-sm">
			<Button type="button" variant="secondary" size="icon" class="shadow-sm">
				<FunnelIcon class="size-4" />
			</Button>
			<Button type="button" variant="default" size="icon" class="shadow-sm">
				<PlusIcon class="size-4" />
			</Button>
		</div>
	</div>

	<!-- <div class="hidden min-[601px]:block">
			<Table.Header>
				<Table.Row>
					<Table.Head class="">Konto</Table.Head>
					<Table.Head>Kategoria</Table.Head>
					<Table.Head>Komentarz</Table.Head>
					<Table.Head class="text-end">Kwota</Table.Head>
					<Table.Head></Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each transactionCards as transaction (transaction.id)}
					<Table.Row>
						<Table.Cell class="font-medium">{transaction.accountName}</Table.Cell>
						<Table.Cell>{transaction.categoryName}</Table.Cell>
						<Table.Cell>{transaction.comment}</Table.Cell>
						<Table.Cell class="text-end">{formatAmount(transaction.amount, transaction.direction, transaction.currencyDecimals)}</Table.Cell>
						<Table.Cell>{transaction.currencyCode}</Table.Cell>
					</Table.Row>
				{/each} 
			</Table.Body>
		</Table.Root>
	</div> -->
</div>
