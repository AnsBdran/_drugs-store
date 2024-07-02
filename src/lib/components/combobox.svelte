<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import Button from '$lib/components/ui/button/button.svelte';
	import MaterialSymbolsCheckSmallRounded from '~icons/material-symbols/check-small-rounded';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import RadixIconsCaretSort from '~icons/radix-icons/caret-sort';
	let open = false;
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	// component props
	export let form;
	export let name;
	export let label = 'Select an item';
	export let items;
	export let emptyMessage = 'No items were found.';
	export let placeholder = 'Search item..';
	const { form: formData } = form;

	const choosedItem = items.find((i) => i.value === $formData[name]);
</script>

<Form.Field {form} {name} class="relative">
	<Form.Control let:attrs>
		<Popover.Root bind:open let:ids>
			<Form.Control let:attrs>
				<Form.Label class="mb-2 block">{label}</Form.Label>

				<Popover.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="outline"
						role="combobox"
						aria-expanded={open}
						class="w-[200px] justify-between"
					>
						{choosedItem?.label ?? 'select an item'}
						<RadixIconsCaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</Popover.Trigger>
				<input hidden value={$formData[name]} name={attrs.name} type="text" />
			</Form.Control>
			<Popover.Content class="w-[200px] p-0">
				<Command.Root>
					<ScrollArea class="h-72">
						<Command.Input {placeholder} />
						<Command.Empty>{emptyMessage}</Command.Empty>
						<Command.Group>
							{#each items as item}
								<Command.Item
									value={item.value}
									onSelect={(currentValue) => {
										$formData[name] = currentValue;
										closeAndFocusTrigger(ids.trigger);
									}}
								>
									<MaterialSymbolsCheckSmallRounded
										class={cn('mr-2 h-4 w-4', $formData[name] !== item.value && 'text-transparent')}
									/>
									{item.label}</Command.Item
								>
							{/each}
						</Command.Group>
					</ScrollArea>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
		<Form.FieldErrors />
	</Form.Control>
</Form.Field>
