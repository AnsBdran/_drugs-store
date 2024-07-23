<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { arrayProxy, type Infer, type SuperForm } from 'sveltekit-superforms';
	import Button from '../ui/button/button.svelte';
	import type { MetadataSchema } from '$lib/schemas/metdata';
	import { fly } from 'svelte/transition';
	import MaterialSymbolsDeleteForeverRounded from '~icons/material-symbols/delete-forever-rounded';
	import MaterialSymbolsAdd from '~icons/material-symbols/add';

	type FormType = SuperForm<Infer<MetadataSchema>>;
	export let form: FormType;
	export let name: keyof Infer<MetadataSchema>;
	export let label: string = 'label';

	const { values } = arrayProxy(form, name);

	const addInput = () => {
		if (name === 'strengths') {
			values.update((prev) => [...prev, { amount: '', per: '' }]);
		} else {
			values.update((prev: string[]) => [...prev, '']);
		}
	};

	const removeInput = (index: number) => {
		values.update((prev) => prev.filter((_, i) => i !== index));
	};
</script>

<Form.Fieldset {form} {name} class=" pt-4">
	<div class="flex justify-between">
		<Form.Legend>{name}</Form.Legend>
		<Button on:click={addInput} size="icon"><MaterialSymbolsAdd /></Button>
	</div>
	{#if name !== 'strengths'}
		{#each $values as _, i (i)}
			<div transition:fly class="flex h-24 items-start gap-3">
				<Form.ElementField {form} name={`${name}[${i}]`} class="flex-1">
					<Form.Control let:attrs>
						<Form.Label>{i + 1}. {label}</Form.Label>

						<Input {...attrs} bind:value={$values[i]} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.ElementField>
				<Button class="mt-8" size="icon" variant="secondary" on:click={() => removeInput(i)}
					><MaterialSymbolsDeleteForeverRounded /></Button
				>
			</div>
		{/each}
	{:else if name === 'strengths'}
		<!-- {#if $values} -->

		{#each $values as _, i (i)}
			<div transition:fly class="flex h-24 items-start gap-3">
				<Form.ElementField {form} name="strengths[{i}].amount">
					<Form.Control>
						<Form.Label>Amount</Form.Label>
						<Input bind:value={$values[i].amount} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.ElementField>
				<Form.ElementField {form} name="strengths[{i}].per">
					<Form.Control>
						<Form.Label>Per</Form.Label>
						<Input bind:value={$values[i].per} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.ElementField>

				<Button class="mt-8" size="icon" variant="secondary" on:click={() => removeInput(i)}
					><MaterialSymbolsDeleteForeverRounded /></Button
				>
			</div>
		{/each}
	{/if}
	<!-- {/if} -->
</Form.Fieldset>
