<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import * as Alert from '$lib/components/ui/alert';
	import { z } from 'zod';
	import { Input } from '$lib/components/ui/input';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { MultiCombo, Combo } from '$lib/components';
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { makeSelectItems } from '$lib/utils';
	import InputSkeleton from '$lib/components/skeletons/input-skeleton.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { drugSchema } from './schema';
	import MaterialSymbolsAttachFileAdd from '~icons/material-symbols/attach-file-add';
	import MaterialSymbolsLightDeleteOutlineRounded from '~icons/material-symbols-light/delete-outline-rounded';
	import { ElementField } from 'formsnap';
	import indications from '$lib/data.json';
	export let data: PageData;
	let messageStr = '';
	const form = superForm(data.form, {
		dataType: 'json',
		validators: zodClient(drugSchema),
		onError: ({ result }) => {
			messageStr = result.error.message;
		}
	});
	const { enhance, form: formData, message } = form;
	type Form = z.infer<typeof drugSchema>;

	$: showDeleteGeneric = $formData.name.generic.length > 1;

	const removeGenericName = (index) => {
		if (!showDeleteGeneric) return;
		formData.update((prev) => {
			return {
				...prev,
				name: {
					...prev.name,
					generic: $formData.name.generic.filter((_, i) => i !== index)
				}
			};
		});
	};

	const addGenericName = () => {
		$formData.name.generic = [...$formData.name.generic, ''];
	};

	console.log('form is', form);
</script>

<SuperDebug data={$formData} />
<Alert.Root>
	<Alert.Title>{messageStr}</Alert.Title>
</Alert.Root>
<form method="POST" use:enhance>
	<Card.Root>
		<Card.Header></Card.Header>
		<Card.Content class="space-y-4">
			<Form.Field {form} name="name.brand">
				<Form.Control let:attrs>
					<Form.Label
						>Drug
						<span class="rounded-md bg-accent px-1 text-accent-foreground"> brand </span>
						name</Form.Label
					>
					<Input {...attrs} bind:value={$formData.name.brand} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>

			<Form.Fieldset {form} name="name.generic">
				<div class="options-center flex justify-between">
					<Form.Legend class="text-base text-muted-foreground">Drug generic names</Form.Legend>
					<Button
						on:click={addGenericName}
						type="button"
						variant="default"
						class="bg-green-500 hover:bg-green-600"
						size="icon"><MaterialSymbolsAttachFileAdd /></Button
					>
				</div>

				{#each $formData.name.generic as _, i}
					<Form.ElementField {form} name="name.generic[{i}]">
						<Form.Control let:attrs>
							<Form.Label>generic name {i + 1}</Form.Label>

							<div class="options-center flex justify-between gap-2">
								<Input {...attrs} bind:value={$formData.name.generic[i]} />
								{#if showDeleteGeneric}
									<Form.Button
										on:click={() => removeGenericName(i)}
										type="button"
										size="icon"
										variant="destructive"><MaterialSymbolsLightDeleteOutlineRounded /></Form.Button
									>
								{/if}
							</div>
						</Form.Control>
						<Form.FieldErrors />
					</Form.ElementField>
				{/each}
			</Form.Fieldset>

			{#await data.indications}
				<InputSkeleton />
			{:then indications}
				<MultiCombo
					options={makeSelectItems(indications)}
					label="Choose the drug indications"
					name="indications"
					{form}
				/>
			{/await}
			{#await data.contraIndications}
				<InputSkeleton />
			{:then contraIndications}
				<MultiCombo
					options={makeSelectItems(contraIndications)}
					label="Choose the drug contra indications"
					name="contraIndications"
					{form}
				/>
			{/await}
			{#await data.categories}
				<InputSkeleton />
			{:then categories}
				<MultiCombo
					options={makeSelectItems(categories)}
					label="Choose the drug categories"
					name="categoryIDs"
					{form}
				/>
			{/await}
			{#await data.manufacturers}
				<InputSkeleton />
			{:then manufacturers}
				<Combo
					options={makeSelectItems(manufacturers)}
					label="Choose the manufacturer"
					name={['manufacturerID']}
					{form}
				/>
			{/await}
		</Card.Content>
		<Card.Footer>
			<Button type="submit">Submit</Button>
		</Card.Footer>
	</Card.Root>
</form>
