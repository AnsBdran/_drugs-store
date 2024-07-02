<script lang="ts">
	import { Combobox } from 'bits-ui';
	import { Label } from '$lib/components/ui/label';
	import { cn, flyAndScale } from '$lib/utils';
	import MaterialSymbolsCheckRounded from '~icons/material-symbols/check-rounded';
	import PhCaretUpDownBold from '~icons/ph/caret-up-down-bold';
	import ScrollArea from './ui/scroll-area/scroll-area.svelte';
	import { arrayProxy } from 'sveltekit-superforms';
	import SelectedShips from './selected-ships.svelte';

	// props
	export let items: { label: string; value: string }[];
	export let label;
	export let placeholder = 'Choose from the list';
	export let form;
	export let name;

	// TODO => how to tell typescript that values of SelectOption[] type.
	type SelctOption = {
		value: string;
		label: string;
		disabled: boolean;
	};

	const { values } = arrayProxy(form, name);

	let inputValue = '';
	let touchedInput = false;

	const deleteOption = (event) => {
		const item = event.detail;
		values.update((prev) => {
			let updated = prev.filter((i) => i.value !== item.value);
			return updated;
		});
	};

	$: filteredItems =
		inputValue && touchedInput
			? items.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()))
			: items;
	$: console.log('reactive', inputValue, touchedInput, $values);
</script>

<Combobox.Root
	items={filteredItems}
	multiple
	bind:inputValue
	bind:selected={$values}
	bind:touchedInput
>
	<div class="space-y-2">
		<Label>{label}</Label>
		<div class="relative">
			<Combobox.Input
				{placeholder}
				class={cn(
					'inline-flex h-9 w-full truncate rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
				)}
			/>
			<PhCaretUpDownBold
				class="absolute end-3 top-1/2 size-6 -translate-y-1/2 text-muted-foreground"
			/>
		</div>
	</div>
	<Combobox.Content
		transition={flyAndScale}
		sideOffset={8}
		class="w-full rounded-md border-2 border-muted bg-background shadow-popover outline-none"
	>
		<ScrollArea class="h-72">
			{#each filteredItems as item (item.value)}
				<Combobox.Item
					class="rounded-button Combobox-none flex h-10 w-full items-center py-3 pl-5 pr-1.5 text-sm outline-none transition-all duration-75 data-[highlighted]:bg-muted"
					value={item.value}
					label={item.label}
				>
					{item.label}
					<Combobox.ItemIndicator class="ml-auto" asChild={false}>
						<MaterialSymbolsCheckRounded />
					</Combobox.ItemIndicator>
				</Combobox.Item>
			{:else}
				<span class="block px-5 py-2 text-sm text-muted-foreground"> No results found </span>
			{/each}
		</ScrollArea>
	</Combobox.Content>
	<Combobox.Arrow />
	<Combobox.HiddenInput />
</Combobox.Root>
<SelectedShips selected={$values ?? []} on:delete={deleteOption} />
