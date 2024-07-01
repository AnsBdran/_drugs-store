<script>
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import Combobox from '$lib/components/combobox.svelte';
	import { superForm } from 'sveltekit-superforms';
	export let data;

	const form = superForm(data.form, {
		dataType: 'json'
	});
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Drug item</Card.Title>
		<Card.Description>Add new drug item</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form.Field name="drugID" {form}>
			<Form.Control let:attrs>
				<Form.Label>Main Drug</Form.Label>
				<!-- <Combobox /> -->
			</Form.Control>
		</Form.Field>
	</Card.Content>
</Card.Root>
