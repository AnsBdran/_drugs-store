<script lang="ts">
	import { Combobox } from 'bits-ui';
	import { Label } from '$lib/components/ui/label';
	import { cn, flyAndScale } from '$lib/utils';
	import MaterialSymbolsCheckRounded from '~icons/material-symbols/check-rounded';
	import PhCaretUpDownBold from '~icons/ph/caret-up-down-bold';
	export let items;
	export let label;
	export let placeholder = 'Choose from the list';
	export let inputValue: string[];
	export let formData;
</script>

<Combobox.Root {items} multiple bind:inputValue={$formData.manufacturerID}>
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
		class="w-full rounded-md border border-muted bg-background shadow-popover outline-none"
	>
		{#each items as theme}
			<Combobox.Item
				class="rounded-button Combobox-none flex h-10 w-full items-center py-3 pl-5 pr-1.5 text-sm outline-none transition-all duration-75 data-[highlighted]:bg-muted"
				value={theme.value}
				label={theme.label}
			>
				{theme.label}
				<Combobox.ItemIndicator class="ml-auto" asChild={false}>
					<MaterialSymbolsCheckRounded />
				</Combobox.ItemIndicator>
				<Combobox.Separator />
			</Combobox.Item>
		{/each}
	</Combobox.Content>
	<Combobox.Arrow size={8} />
	<Combobox.HiddenInput />
</Combobox.Root>
