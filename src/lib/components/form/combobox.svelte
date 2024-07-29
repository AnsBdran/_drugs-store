<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import MaterialSymbolsCheckSmallRounded from '~icons/material-symbols/check-small-rounded';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import RadixIconsCaretSort from '~icons/radix-icons/caret-sort';
	import { formFieldProxy } from 'sveltekit-superforms';
	import { buttonVariants } from '../ui/button';
	import FormFieldErrors from '../ui/form/form-field-errors.svelte';
	let open = false;
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	// component props
	export let form;
	export let path: string[];
	export let label = 'Select an item';
	export let options;
	export let emptyMessage = 'No items were found.';
	export let placeholder = 'Search item..';
	export let width: number = 120;
	let className = '';
	export { className as class };

	const bindValue = path.join('.');

	let { value, errors } = formFieldProxy(form, bindValue);
	// $: choosedItem = options.find((i) => i.value === value);
	// console.log('________', { bindValue, choosedItem });
</script>

<Form.Field {form} name={bindValue} class="space-y-2 {className}">
	<Popover.Root bind:open let:ids>
		<Form.Control let:attrs>
			<Form.Label class="mb-1 mt-[6px] block leading-none">{label}</Form.Label>
			<Popover.Trigger
				class={cn(
					buttonVariants({ variant: 'outline' }),
					`w-[${width}px] justify-between`,
					!$value && 'text-muted-foreground'
				)}
				role="combobox"
				{...attrs}
			>
				{options.find((i) => {
					if (typeof i.value !== 'object') {
						return i.value === $value;
					}
					if (typeof i.value === 'object') {
						return i.value.amount === $value?.amount && i.value.per === $value?.per;
					}
				})?.label ?? 'select an item'}
				<RadixIconsCaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Popover.Trigger>
			<input hidden value={$value} name={attrs.name} type="text" />
			<!-- </div> -->
		</Form.Control>
		<Popover.Content class={cn('p-0', `w-[${width}px]`)}>
			<Command.Root>
				<Command.Input {placeholder} autofocus />
				<Command.Empty>{emptyMessage}</Command.Empty>
				<ScrollArea class="h-72">
					<Command.Group>
						{#each options as option (option.value)}
							<Command.Item
								value={option.label}
								onSelect={() => {
									$value = option.value;
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								<MaterialSymbolsCheckSmallRounded
									class={cn('mr-2 h-4 w-4', $value !== option.value && 'text-transparent')}
								/>
								{option.label}
							</Command.Item>
						{/each}
					</Command.Group>
				</ScrollArea>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
	<!-- {#if $errors} -->
	<FormFieldErrors>
		{#if typeof $errors === 'object' && $errors !== null && '_errors' in $errors}
			{$errors._errors ?? ''}
		{:else if typeof $errors !== 'undefined'}
			{$errors}
		{:else}
			{''}
		{/if}
	</FormFieldErrors>
</Form.Field>
