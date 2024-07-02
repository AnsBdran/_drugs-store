<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { MultiCombo, Combo } from '$lib/components';
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { makeSelectItems } from '$lib/utils';
	import { contraIndications, indications } from '$lib/info';
	import InputSkeleton from '$lib/components/skeletons/input-skeleton.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	export let data: PageData;
	const form = superForm(data.form, {
		dataType: 'json'
	});
	const { enhance, form: formData } = form;
</script>

<SuperDebug data={$formData} />
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
			<Form.Field {form} name="name.generic">
				<Form.Control let:attrs>
					<Form.Label
						>Drug
						<span class="rounded-md bg-accent px-1 text-accent-foreground"> generic </span>
						name</Form.Label
					>
					<Input {...attrs} bind:value={$formData.name.generic} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>
			{#await data.indications}
				<InputSkeleton />
			{:then indications}
				<MultiCombo
					items={makeSelectItems(indications)}
					label="Choose the drug indications"
					name="indications"
					{form}
				/>
			{/await}
			{#await data.contraIndications}
				<InputSkeleton />
			{:then contraIndications}
				<MultiCombo
					items={makeSelectItems(contraIndications)}
					label="Choose the drug contra indications"
					name="contraIndications"
					{form}
				/>
			{/await}
			{#await data.categories}
				<InputSkeleton />
			{:then categories}
				<MultiCombo
					items={makeSelectItems(categories)}
					label="Choose the drug categories"
					name="categoryIDs"
					{form}
				/>
			{/await}
			{#await data.manufacturers}
				<InputSkeleton />
			{:then manufacturers}
				<Combo
					items={makeSelectItems(manufacturers)}
					label="Choose the manufacturer"
					name="manufacturerID"
					{form}
				/>
			{/await}
		</Card.Content>
		<Card.Footer>
			<Button type="submit">Submit</Button>
		</Card.Footer>
	</Card.Root>
</form>
