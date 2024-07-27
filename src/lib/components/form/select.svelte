<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import * as Form from '$lib/components/ui/form';
	import { formFieldProxy } from 'sveltekit-superforms';

	// component props
	export let form;
	export let path: string[];
	export let label;
	export let placeholder = 'Select a value from the list';
	export let options: { value: string; label: string }[];

	const bindPath = path.join('.');
	console.log('....', bindPath);
	const { value } = formFieldProxy<any, 'responseStatus', string>(form, bindPath);
	// $: selected = $formData[path] ? { label: $formData[path], value: $formData[path] } : undefined;
	$: selected = $value ? { label: $value, value: $value } : undefined;
</script>

<Form.Field {form} name={bindPath}>
	<Form.Control let:attrs>
		<Form.Label>{label}</Form.Label>
		<Select.Root
			{selected}
			onSelectedChange={(v) => {
				v && ($value = v.value);
			}}
		>
			<Select.Trigger {...attrs}>
				<Select.Value {placeholder} />
			</Select.Trigger>
			<Select.Content>
				{#each options as option (option.value)}
					<Select.Item value={option.value} label={option.label} />
				{/each}
			</Select.Content>
		</Select.Root>
		<input hidden bind:value={$value} name={attrs.name} />
	</Form.Control>
</Form.Field>
<!-- <script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import * as Form from '$lib/components/ui/form';
	import { formFieldProxy } from 'sveltekit-superforms';

	// component props
	export let form;
	export let path: string[];
	export let label;
	export let placeholder = 'Select a value from the list';
	export let options: { value: string; label: string }[];

	const bindPath = path.join('.');
	console.log('....', bindPath);
	const { value } = formFieldProxy(form, bindPath);
	// $: selected = $formData[path] ? { label: $formData[path], value: $formData[path] } : undefined;
	$: selected = $value ? { label: $value, value: $value } : undefined;
</script>

<Form.Field {form} name={bindPath}>
	<Form.Control let:attrs>
		<Form.Label>{label}</Form.Label>
		<Select.Root
			bind:selected={selected}
			onSelectedChange={(v) => {
				v && ($value = v.value);
			}}
		>
			<Select.Trigger {...attrs}>
				<Select.Value {placeholder} />
			</Select.Trigger>
			<Select.Content>
				{#each options as option (option.value)}
					<Select.Item value={option.value} label={option.label} />
				{/each}
			</Select.Content>
		</Select.Root>
		<input hidden bind:value={$value} name={bindPath} />
	</Form.Control>
</Form.Field> -->
