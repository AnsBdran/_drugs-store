<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import Combobox from '$lib/components/combobox.svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import InputSkeleton from '$lib/components/skeletons/input-skeleton.svelte';
	import { makeSelectItems, makeStrengthsSelectItems } from '$lib/utils';
	import Input from '$lib/components/ui/input/input.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { drugItemSchema } from './schema';
	import { Combo } from '$lib/components';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	export let data: PageData;

	const form = superForm(data.form, {
		dataType: 'json',
		validators: zodClient(drugItemSchema)
	});
	// console.log('data', data);
	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance enctype="multipart/form-data">
	<SuperDebug data={$formData} />
	<Card.Root>
		<Card.Header>
			<Card.Title>Drug item</Card.Title>
			<Card.Description>Add new drug item</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4">
			{#await data.drugs}
				<InputSkeleton />
			{:then drugs}
				<Combo
					{form}
					items={makeSelectItems(drugs)}
					name={['drugID']}
					label="Selct the parent drug"
				/>
			{/await}

			<!-- price -->
			<Form.Fieldset {form} name="price" class="flex items-center justify-between gap-2">
				<Form.Legend>Drug Price</Form.Legend>
				<Form.Control let:attrs>
					<Form.Label>units</Form.Label>
					<Input {...attrs} type="number" bind:value={$formData.price.unit} />
				</Form.Control>
				<Form.FieldErrors />
				<Form.Control let:attrs>
					<Form.Label>batches</Form.Label>
					<Input {...attrs} type="number" bind:value={$formData.price.batch} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Fieldset>

			<!-- quantity in stock -->
			<Form.Fieldset {form} name="quantityInStock" class="flex items-center justify-between gap-2">
				<Form.Legend>Quantity in stock</Form.Legend>
				<Form.Control let:attrs>
					<Form.Label>units</Form.Label>
					<Input {...attrs} type="number" bind:value={$formData.quantityInStock.unit} />
				</Form.Control>
				<Form.FieldErrors />
				<Form.Control let:attrs>
					<Form.Label>batches</Form.Label>
					<Input {...attrs} type="number" bind:value={$formData.quantityInStock.batch} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Fieldset>

			<!-- Drug description -->
			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Form.Label>Drug description</Form.Label>
					<Textarea {...attrs} bind:value={$formData.description} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Drug strength -->
			{#await data.strengths}
				<InputSkeleton />
			{:then strengths}
				<Combo
					options={makeStrengthsSelectItems(strengths)}
					{form}
					name={['strengthID']}
					label="Choose the drug strength"
				/>
			{/await}
			{#await data.forms}
				<InputSkeleton />
			{:then forms}
				<Combo
					{form}
					options={makeSelectItems(forms)}
					name={['formID']}
					label="Choose the drug form"
				/>
			{/await}
			<Form.Field {form} name="featured">
				<Form.Control let:attrs>
					<Form.Label>Is featured</Form.Label>
					<Checkbox {...attrs} bind:checked={$formData.featured} />
				</Form.Control>
			</Form.Field>
			<!-- <Form.Field></Form.Field> -->
		</Card.Content>
		<Card.Footer>
			<Form.Button>Submit</Form.Button>
		</Card.Footer>
	</Card.Root>
</form>
