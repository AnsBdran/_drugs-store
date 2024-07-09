<!-- <script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import Button from '$lib/components/ui/button/button.svelte';
	import MaterialSymbolsCheckSmallRounded from '~icons/material-symbols/check-small-rounded';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import RadixIconsCaretSort from '~icons/radix-icons/caret-sort';
	import { stringProxy, formFieldProxy } from 'sveltekit-superforms';
	import { buttonVariants } from './ui/button';
	let open = false;
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	// component props
	export let form;
	export let name: string[];
	export let label = 'Select an item';
	export let options;
	export let emptyMessage = 'No items were found.';
	export let placeholder = 'Search item..';
	const { form: formData } = form;

	const bindValue = name.join('.');

	// let {subscribe} = stringProxy(form, name[0], { empty: 'null' });
	let { value, errors } = formFieldProxy(form, name[0]);
	$: choosedItem = options.find((i) => i.value === value);
	// console.log('________', { bindValue, choosedItem });

	// $: options.map((o) => console.log('single', o));
</script> -->
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
	import { stringProxy, formFieldProxy } from 'sveltekit-superforms';
	import { buttonVariants } from './ui/button';
	import FormFieldErrors from './ui/form/form-field-errors.svelte';
	import Label from './ui/label/label.svelte';
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
	let className = '';
	export { className as class };
	const { form: formData } = form;

	const bindValue = path.join('.');

	// let {subscribe} = stringProxy(form, path[0], { empty: 'null' });
	let { value, errors } = formFieldProxy(form, bindValue);
	$: choosedItem = options.find((i) => i.value === value);
	console.log('________', { bindValue, choosedItem });

	// $: options.map((o) => console.log('single', o));
</script>

<Form.Field {form} name={bindValue} class="space-y-2  {className}">
	<Popover.Root bind:open let:ids>
		<Form.Control let:attrs>
			<!-- <div class="flex flex-col space-y-2"> -->
			<Form.Label class="mb-1 mt-[6px] block leading-none">{label}</Form.Label>
			<Popover.Trigger
				class={cn(
					buttonVariants({ variant: 'outline' }),
					'w-[200px] justify-between',
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
		<Popover.Content class="w-[200px] p-0">
			<Command.Root>
				<ScrollArea class="h-72">
					<Command.Input {placeholder} autofocus />
					<Command.Empty>{emptyMessage}</Command.Empty>
					<Command.Group>
						{#each options as option (option.value)}
							<Command.Item
								value={option.label}
								onSelect={() => {
									// $formData[path[0]][path[1]] = option.value;
									$value = option.value;
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								<MaterialSymbolsCheckSmallRounded
									class={cn(
										'mr-2 h-4 w-4',
										$value !== option.value && 'text-transparent'
										// getNestedValue($formData, name) !== option.value && 'text-transparent'
									)}
								/>
								{option.label}</Command.Item
							>
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
	<!-- {/if} -->
	<!-- {#if $errors}
		<Form.FieldErrors>
			{JSON.stringify($errors)}
		</Form.FieldErrors>
	{/if} -->
</Form.Field>
<!-- <Form.Field {form} name={bindValue}>
	<Popover.Root bind:open let:ids>
		<Form.Control let:attrs>
			<Form.Label class="mb-2 block">{label}</Form.Label>
			<Popover.Trigger
				class={cn(
					buttonVariants({ variant: 'outline' }),
					'w-[200px] justify-between',
					!$value && 'text-muted-foreground'
				)}
				role="combobox"
				{...attrs}
			>
				{options.find((i) => i.value === $value)?.label ?? 'select an item'}
				<RadixIconsCaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Popover.Trigger>
			<input hidden value={$value} name={attrs.name} type="text" />
		</Form.Control>
		<Popover.Content class="w-[200px] p-0">
			<Command.Root>
				<ScrollArea class="h-72">
					<Command.Input {placeholder} autofocus />
					<Command.Empty>{emptyMessage}</Command.Empty>
					<Command.Group>
						{#each options as option (option.value)}
							<Command.Item
								value={option.label}
								onSelect={() => {
									$formData[name[0]] = option.value;
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								<MaterialSymbolsCheckSmallRounded
									class={cn(
										'mr-2 h-4 w-4',
										$value !== option.value && 'text-transparent'
										// getNestedValue($formData, name) !== option.value && 'text-transparent'
									)}
								/>
								{option.label}</Command.Item
							>
						{/each}
					</Command.Group>
				</ScrollArea>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
	{#if $errors}
		<Form.FieldErrors>
			{$errors}
		</Form.FieldErrors>
	{/if}
</Form.Field> -->
<!-- <Form.Field {form} name={bindValue} class="relative">
	<Popover.Root bind:open let:ids>
		<Form.Control let:attrs>
			<Form.Label class="mb-2 block">{label}</Form.Label>
			<Popover.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="outline"
					role="combobox"
					aria-expanded={open}
					type="button"
					class="w-[200px] justify-between"
				>
					{choosedItem?.label ?? 'select an item'}
					<RadixIconsCaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</Popover.Trigger>
			<input hidden {value} name={attrs.name} type="text" />
		</Form.Control>
		<Popover.Content class="w-[200px] p-0">
			<Command.Root>
				<ScrollArea class="h-72">
					<Command.Input {placeholder} />
					<Command.Empty>{emptyMessage}</Command.Empty>
					<Command.Group>
						{#each items as item (item.value)}
							<Command.Item
								value={item.value}
								onSelect={(currentValue) => {
									$value = currentValue;
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								<MaterialSymbolsCheckSmallRounded
									class={cn(
										'mr-2 h-4 w-4',
										getNestedValue($formData, name) !== item.value && 'text-transparent'
									)}
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
</Form.Field> -->
