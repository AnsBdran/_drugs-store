<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { Combo, MultiCompo } from '$lib/components';
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { makeSelectItems } from '$lib/utils';

	export let data: PageData;
	const form = superForm(data.form, {
		dataType: 'json'
	});
	const { enhance, form: formData } = form;
	// $: console.log(data);
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
			<MultiCompo
				items={data.indications}
				label="Choose the drug indications"
				name="indications"
				bind:selected={$formData.indications}
				bindTarget="indications"
				{form}
			/>
			<!-- {#await data.indications}
				<p>loading....</p>
			{:then indications}
				<MultiCompo
					items={makeSelectItems(indications)}
					label="Choose the drug indications"
					name="indications"
					bind:selected={$formData.indications}
					bindTarget="indications"
					{form}
				/>
			{/await} -->
			<!-- {#await data.contraIndications}
				<p>loading...</p>
			{:then contraIndications}
				<MultiCompo
					items={makeSelectItems(contraIndications)}
					label="Choose the drug contra-indications"
					name="contraIndications"
					bindTarget="contraIndications"
					bind:selected={$formData.contraIndications}
					{form}
				/>
			{/await}
			{#await data.manufacturers}
				<p>loading...</p>
			{:then manufacturers}
				<Combo
					{form}
					items={makeSelectItems(manufacturers)}
					name="manufacturer"
					bindTarget="manufacturerID"
					label="Select a manufacturer"
				/>
			{/await} -->
		</Card.Content>
		<Card.Footer>
			<Button type="submit">Submit</Button>
		</Card.Footer>
	</Card.Root>
</form>
