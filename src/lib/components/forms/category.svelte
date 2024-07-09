<script>
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';

	// props

	export let form;

	const { form: formData } = form;
</script>

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
		<!-- <Input type="file" {...attrs} bind:value={$formData.image} /> -->
		<input type="file" {...attrs} bind:files={$formData.image} />
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
