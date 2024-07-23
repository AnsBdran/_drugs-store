<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import SmallForm from './small-form.svelte';
	import { metadataSchema, type MetadataSchema } from '$lib/schemas/metdata';
	import SuperDebug, { superForm, type Infer } from 'sveltekit-superforms';
	import type { SuperValidated } from 'sveltekit-superforms';
	import Button from '$lib/components/ui/button/button.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	export let data: SuperValidated<Infer<MetadataSchema>>;

	const form = superForm(data, {
		dataType: 'json',
		validators: zodClient(metadataSchema)
	});
	const { form: formData, enhance } = form;
</script>

<SuperDebug data={$formData} />
<Card.Root>
	<Card.Header>
		<Card.Title>Add new Metadata</Card.Title>
	</Card.Header>
	<form method="post" use:enhance>
		<Card.Content>
			<div class="space-y-4 divide-y-2 divide-primary/30">
				<SmallForm label="drug indication" {form} name="indications" />
				<SmallForm label="drug contra-indication" {form} name="contraIndications" />
				<SmallForm label="drug active ingredient" {form} name="activeIngredients" />
				<SmallForm label="drug form" {form} name="forms" />
				<SmallForm label="drug category" {form} name="categories" />
				<SmallForm label="drug strength" name="strengths" {form} />
			</div>
		</Card.Content>

		<Card.Footer>
			<Button type="submit">submit</Button>
		</Card.Footer>
	</form>
</Card.Root>
