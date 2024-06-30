<script>
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { categoryFormSchema } from './schema';
	import { Textarea } from '$lib/components/ui/textarea';
	import Button from '$lib/components/ui/button/button.svelte';
	import SvgSpinners12DotsScaleRotate from '~icons/svg-spinners/12-dots-scale-rotate';
	import * as Alert from '$lib/components/ui/alert';

	export let data;
	const form = superForm(data.form, {
		// validators: zod(categoryFormSchema)
	});

	const { form: formData, errors, enhance, delayed, message } = form;
	console.log({
		$errors
	});
</script>

<SuperDebug data={$formData} />
{#if $message}
	<Alert.Root>
		<Alert.Title>{$message}</Alert.Title>
	</Alert.Root>
{/if}
<form method="POST" class="" enctype="multipart/form-data" use:enhance>
	<Card.Root>
		<Card.Header>
			<Card.Title>Category</Card.Title>
			<Card.Description>create a new category for drugs</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4">
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Category Name</Form.Label>
					<Input {...attrs} bind:value={$formData.name} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>
			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Form.Label>Category Description</Form.Label>
					<Textarea {...attrs} bind:value={$formData.description} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>
			<Form.Field {form} name="image">
				<Form.Control let:attrs>
					<Form.Label>Category Image</Form.Label>
					<Input type="file" {...attrs} bind:value={$formData.image} />
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			<Button type="submit"
				>Submit
				{#if $delayed}
					<SvgSpinners12DotsScaleRotate />
				{/if}
			</Button>
		</Card.Footer>
	</Card.Root>
</form>
