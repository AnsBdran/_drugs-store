<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { MultiCombo, Combo } from '$lib/components/form';
	import { makeSelectItems, makeSelectItemsFromStrings, makeStringsSelectItems } from '$lib/utils';
	import InputSkeleton from '$lib/components/skeletons/input-skeleton.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import LoadErrorAlert from './load-error-alert.svelte';
	import type { Infer, SuperForm } from 'sveltekit-superforms';
	import type { DrugSchema } from '$lib/schemas/drug';
	import SuperDebug from 'sveltekit-superforms';
	import type { Drug } from '@prisma/client';

	// props
	export let form: SuperForm<Infer<DrugSchema>>;
	export let manufacturers;
	export let info;
	export let initialValues: Drug;

	const { form: formData } = form;

	// initialValues &&
	// 	Object.assign($formData, {
	// 		// indications: initialValues.indications.map((i) => ({ label: i, value: i })),
	// 		indications: makeSelectItemsFromStrings(initialValues.indications),
	// 		contraIndications: makeSelectItemsFromStrings(initialValues.contraIndications),
	// 		categories: makeSelectItemsFromStrings(initialValues.categories),
	// 		brandName: initialValues.brandName
	// 	});

	initialValues &&
		formData.set({
			brandName: initialValues.brandName,
			categories: makeSelectItemsFromStrings(initialValues.categories),
			contraIndications: makeSelectItemsFromStrings(initialValues.contraIndications),
			indications: makeSelectItemsFromStrings(initialValues.indications),
			description: initialValues.description ?? '',
			manufacturerID: initialValues.manufacturerID
		});
</script>

<Form.Field {form} name="brandName">
	<Form.Control let:attrs>
		<Form.Label
			>Drug
			<span class="rounded-md bg-accent px-1 text-accent-foreground"> brand </span>
			name</Form.Label
		>
		<Input {...attrs} bind:value={$formData.brandName} />
		<Form.FieldErrors />
	</Form.Control>
</Form.Field>
<Form.Field {form} name="description">
	<Form.Control let:attrs>
		<Form.Label>Drug description</Form.Label>
		<Textarea {...attrs} bind:value={$formData.description} />
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>

{#await info}
	<InputSkeleton /> <InputSkeleton /><InputSkeleton />
{:then info}
	<MultiCombo
		options={makeStringsSelectItems(info.indications)}
		label="Choose the drug indications"
		name="indications"
		{form}
	/>
	<MultiCombo
		options={makeStringsSelectItems(info.contraIndications)}
		label="Choose the drug contra indications"
		name="contraIndications"
		{form}
	/>
	<MultiCombo
		options={makeStringsSelectItems(info.categories.map((i) => i.name))}
		label="Choose the drug categories"
		name="categories"
		{form}
	/>
{:catch}
	<LoadErrorAlert name="indications" />
	<LoadErrorAlert name="contraindications" />
	<LoadErrorAlert name="categories" />
{/await}
{#await manufacturers}
	<InputSkeleton />
{:then manufacturers}
	<Combo
		options={makeSelectItems(manufacturers)}
		label="Choose the manufacturer"
		path={['manufacturerID']}
		{form}
	/>
{:catch}
	<LoadErrorAlert name="manufacturer" />
{/await}
