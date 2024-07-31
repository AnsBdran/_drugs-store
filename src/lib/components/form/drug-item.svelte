<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Button } from '$lib/components/ui/button';
	import InputSkeleton from '$lib/components/skeletons/input-skeleton.svelte';
	import {
		makeDrugsSelectItems,
		makeSelectItemsFromStrings,
		makeStrengthsSelectItems,
		makeStringsSelectItems
	} from '$lib/utils';
	import { Input } from '$lib/components/ui/input';
	import { Combo } from '$lib/components/form';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import MaterialSymbolsDeleteForeverRounded from '~icons/material-symbols/delete-forever-rounded';
	import FormFieldErrors from '$lib/components/ui/form/form-field-errors.svelte';
	import MaterialSymbolsAdd from '~icons/material-symbols/add';
	import { Select } from '$lib/components/form';
	import { fly, fade } from 'svelte/transition';
	import { fileProxy, type Infer, type SuperForm } from 'sveltekit-superforms';
	import LoadErrorAlert from './load-error-alert.svelte';
	import type { DrugItemSchema } from '$lib/schemas/drug-item';
	import type { Info } from '@prisma/client';
	import { Badge } from '../ui/badge';

	// props
	export let form: SuperForm<Infer<DrugItemSchema>>;
	export let info: Info;
	export let drugs;
	// export let activeIngredients;
	export let initialValues = undefined;
	// console.log('info in form', info);
	const { form: formData, errors } = form;

	const imageFile = fileProxy(form, 'image');

	$: showDeleteActiveIngredientButton = $formData.activeIngredients.length > 1;

	const removeActiveIngredient = (index) => {
		if (!showDeleteActiveIngredientButton) return;
		formData.update((prev) => {
			return {
				...prev,
				activeIngredients: $formData.activeIngredients.filter((_, i) => i !== index)
			};
		});
	};

	const addActiveIngredient = () => {
		formData.update((prev) => {
			return {
				...prev,
				activeIngredients: [
					...prev.activeIngredients,
					{ name: '', strength: { amount: '', per: 'unit' } }
				]
			};
		});
	};

	initialValues && Object.assign($formData, initialValues);
	// $: console.log('initial values', initialValues);
</script>

<!-- ==================================== -->
<!-- parent drug -->
{#await drugs}
	<InputSkeleton />
{:then drugs}
	<Combo {form} options={makeDrugsSelectItems(drugs)} path={['drugID']} label="Parent drug" />
{:catch}
	<LoadErrorAlert name="main drug" />
{/await}
<!-- ==================================== -->

<!-- ==================================== -->
<!-- active ingredients -->
<Form.Fieldset {form} name="activeIngredients" class="border border-muted p-3">
	<div class="flex items-center justify-between gap-8">
		<Form.Legend>Drug active ingredients</Form.Legend>
		<Button on:click={addActiveIngredient} size="icon"><MaterialSymbolsAdd /></Button>
	</div>
	{#await info}
		<div class="flex items-start gap-2 bg-green-800/5">
			<InputSkeleton />
			<InputSkeleton />
		</div>
	{:then info}
		{#each $formData.activeIngredients as _, i (i)}
			<div class="flex flex-col items-stretch gap-3">
				<div
					class="flex items-start gap-2"
					in:fly={{ duration: 500, y: 50 }}
					out:fly={{ duration: 500, y: 50 }}
				>
					<Badge variant="outline" class="mt-[2px]">{i + 1}</Badge>
					<Combo
						options={makeSelectItemsFromStrings(info?.activeIngredients)}
						{form}
						path={[`activeIngredients[${i}]`, 'name']}
						label="Active Ingredient"
						class=""
					/>
					<Combo
						options={makeStrengthsSelectItems(info?.strengths)}
						{form}
						path={[`activeIngredients[${i}]`, 'strength']}
						label="strength"
						class=""
					/>
					{#if showDeleteActiveIngredientButton}
						<div class=" mb-auto self-stretch" transition:fade>
							<Button
								on:click={() => removeActiveIngredient(i)}
								variant="destructive"
								size="icon"
								class="mt-[32px]"
								><MaterialSymbolsDeleteForeverRounded />
							</Button>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	{:catch}
		<LoadErrorAlert name="active ingredients" />
	{/await}
</Form.Fieldset>
<!-- ==================================== -->

<!-- ==================================== -->
<!-- price -->

<!-- ==================================== -->
<!-- description -->
<Form.Field {form} name="description">
	<Form.Control let:attrs>
		<Form.Label>Drug description</Form.Label>
		<Textarea {...attrs} bind:value={$formData.description} />
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
<!-- ==================================== -->

<!-- ==================================== -->
<Form.Fieldset {form} name="price" class="flex items-center gap-2">
	<Form.Legend>Drug Price</Form.Legend>
	<Form.ElementField {form} name="price.item">
		<Form.Control let:attrs>
			<Form.Label>item</Form.Label>
			<Input {...attrs} type="number" bind:value={$formData.price.item} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.ElementField>
	<Form.ElementField {form} name="price.batch">
		<Form.Control let:attrs>
			<Form.Label>batch</Form.Label>
			<Input {...attrs} type="number" bind:value={$formData.price.batch} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.ElementField>
</Form.Fieldset>
<!-- ==================================== -->

{#await info}
	<InputSkeleton />
{:then info}
	<Combo
		{form}
		options={makeStringsSelectItems(info?.forms)}
		path={['form']}
		label="Choose the drug form"
	/>
{:catch}
	<LoadErrorAlert name="drug form" />
{/await}
<!-- ==================================== -->
<Form.Fieldset {form} name="size">
	<div class="flex items-end gap-4">
		<Form.ElementField {form} name="size.amount">
			<div class="space-y-2">
				<Form.Control let:attrs>
					<Form.Label>Drug Total size</Form.Label>
					<Input type="number" {...attrs} bind:value={$formData.size.amount} class="mb-0" />
				</Form.Control>
			</div>
		</Form.ElementField>
		<Select
			{form}
			options={makeSelectItemsFromStrings(['mg', 'g', 'l', 'ml', 'unit'])}
			path={['size', 'unit']}
			label="unit"
			placeholder="choose an unit"
		/>
	</div>
	{#if $errors?.size?.amount}
		<Form.FieldErrors>{$errors.size.amount}</Form.FieldErrors>
	{/if}
</Form.Fieldset>

<!-- ==================================== -->
<!-- image field -->
<Form.Field {form} name="image">
	<Form.Control let:attrs>
		<Form.Label>Drug image</Form.Label>
		<input type="file" {...attrs} bind:files={$imageFile} />
		<!-- <Input type="file" {...attrs} bind:value={$formData.image} /> -->
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>

<!-- ==================================== -->
<!-- Checkboxes -->
<Form.Field
	{form}
	name="featured"
	class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
>
	<Form.Control let:attrs>
		<Checkbox {...attrs} bind:checked={$formData.featured} />
		<div class="space-y-2 leading-none">
			<Form.Label>Mark this drug as featured</Form.Label>
			<Form.Description>Make this drug special by marking it as a featured one</Form.Description>
		</div>
	</Form.Control>
</Form.Field>

<!-- ==================================== -->
<!-- available -->
<Form.Field
	{form}
	name="available"
	class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
>
	<Form.Control let:attrs>
		<Checkbox {...attrs} bind:checked={$formData.available} />
		<div class="space-y-2 leading-none">
			<Form.Label>Drug availability</Form.Label>
			<Form.Description
				>If you uncheck it, the drug will not be visible to the user.</Form.Description
			>
		</div>
	</Form.Control>
</Form.Field>
