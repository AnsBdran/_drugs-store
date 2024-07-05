<script lang="ts">
	import type { PageData } from '../$types';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Combo } from '$lib/components';
	import { countries } from '$lib/info';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import manufacturerSchema from './schema';
	import { makeSelectItemsFromStrings } from '$lib/utils';
	export let data: PageData;
	const form = superForm(data.form, {
		validators: zodClient(manufacturerSchema)
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root>
	<SuperDebug data={$formData} />
	<Card.Header>
		<Card.Title>Manufacturer</Card.Title>
		<Card.Description>create a new manufacturer</Card.Description>
	</Card.Header>
	<Card.Content>
		<form class="space-y-4" method="POST" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Manufacturer Name</Form.Label>
					<Input {...attrs} bind:value={$formData.name} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>
			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Form.Label>Manufacturer Description</Form.Label>
					<Textarea {...attrs} bind:value={$formData.description} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>
			<Combo
				{form}
				options={makeSelectItemsFromStrings(countries)}
				label="Select a country"
				name={['country']}
			/>
			<Form.Field {form} name="city">
				<Form.Control let:attrs>
					<Form.Label>Manufacturer city</Form.Label>
					<Input bind:value={$formData.city} {...attrs} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>
			<Form.Field
				{form}
				name="featured"
				class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
			>
				<Form.Control let:attrs>
					<Checkbox {...attrs} bind:checked={$formData.featured} />
					<div class="space-y-1 leading-none">
						<Form.Label>Make it featured</Form.Label>
						<Form.Description
							>Mark this manufacturer as a special and featured one.
						</Form.Description>
					</div>
				</Form.Control>
			</Form.Field>
			<Button type="submit">Submit</Button>
		</form>
	</Card.Content>
</Card.Root>
