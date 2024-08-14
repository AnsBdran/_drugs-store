<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Combo } from '$lib/components/form';
	import { countries } from '$lib/info';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { makeSelectItemsFromStrings } from '$lib/utils';
	import type { Manufacturer } from '@prisma/client';
	import type { Infer, SuperForm } from 'sveltekit-superforms';
	import type { ManufacturerSchema } from '$lib/schemas/manufacturer';

	// props
	export let form: SuperForm<Infer<ManufacturerSchema>>;
	export let initialValues: Manufacturer | undefined = undefined;
	const { form: formData } = form;

	initialValues &&
		Object.assign($formData, {
			name: initialValues.name,
			country: initialValues.country,
			city: initialValues.city,
			featured: initialValues.featured,
			description: initialValues.description
		});
	// initialValues && Object.assign($formData, initialValues);
	console.log('form initial values', { initialValues, $formData });
</script>

<Form.Field {form} name="name">
	<Form.Control let:attrs>
		<Form.Label>Manufacturer Name</Form.Label>
		<Input {...attrs} bind:value={$formData.name} />
		<Form.FieldErrors />
	</Form.Control>
</Form.Field>
<Form.Field {form} name="description">
	<Form.Control let:attrs>
		<Form.Label>Manufacturer Description</Form.Label>
		<Textarea {...attrs} bind:value={$formData.description} />
		<Form.FieldErrors />
	</Form.Control>
</Form.Field>
<Combo
	{form}
	options={makeSelectItemsFromStrings(countries)}
	label="Select a country"
	path={['country']}
/>
<Form.Field {form} name="city">
	<Form.Control let:attrs>
		<Form.Label>Manufacturer city</Form.Label>
		<Input bind:value={$formData.city} {...attrs} />
		<Form.FieldErrors />
	</Form.Control>
</Form.Field>
<Form.Field
	{form}
	name="featured"
	class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
>
	<Form.Control let:attrs>
		<Checkbox {...attrs} bind:checked={$formData.featured} />
		<div class="space-y-1 leading-none">
			<Form.Label>Make it featured</Form.Label>
			<Form.Description>Mark this manufacturer as a special and featured one.</Form.Description>
		</div>
	</Form.Control>
</Form.Field>
