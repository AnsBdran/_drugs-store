<script>
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import Combobox from '$lib/components/combobox.svelte';
	export let data;

	const form = superForm(data.form, {
		dataType: 'json'
	});
	const { enhance, form: formData } = form;

	const themes = [
		{ value: 'light-monochrome', label: 'Light Monochrome' },
		{ value: 'dark-green', label: 'Dark Green' },
		{ value: 'svelte-orange', label: 'Svelte Orange' },
		{ value: 'punk-pink', label: 'Punk Pink' }
	];
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
			<Combobox
				items={themes}
				label="Choose the drug indications"
				bind:inputValue={$formData.indications}
				{formData}
			/>
		</Card.Content>
	</Card.Root>
</form>
