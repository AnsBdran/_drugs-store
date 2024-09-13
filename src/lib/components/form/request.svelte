<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { RequestSchema } from '$lib/schemas/request';
	import { fileProxy, type Infer, type SuperForm } from 'sveltekit-superforms';
	import Input from '../ui/input/input.svelte';
	import { type Request } from '@prisma/client';

	export let form: SuperForm<Infer<RequestSchema>>;
	export let initialValues: Request | null = null;
	const { form: formData } = form;

	const imageFile = fileProxy(form, 'image');
	// initialValues && Object.assign($formData, initialValues);
	initialValues &&
		formData.set({
			brandName: initialValues.brandName,
			description: initialValues.description,
			genericName: initialValues.description,
			strength: initialValues.strength
		});
</script>

<Form.Field {form} name="brandName">
	<Form.Control let:attrs>
		<Form.Label>Drug brand name</Form.Label>
		<Input bind:value={$formData.brandName} {...attrs} />
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
<Form.Field {form} name="genericName">
	<Form.Control let:attrs>
		<Form.Label>Drug generic name</Form.Label>
		<Input bind:value={$formData.genericName} {...attrs} />
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
<Form.Field {form} name="description">
	<Form.Control let:attrs>
		<Form.Label>Drug Description</Form.Label>
		<Input bind:value={$formData.description} {...attrs} />
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
<Form.Field {form} name="strength">
	<Form.Control let:attrs>
		<Form.Label>Drug strength</Form.Label>
		<Input bind:value={$formData.strength} {...attrs} />
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
