<script>
	import * as Form from '$lib/components/ui/form';
	import { Input } from '../ui/input';

	// props
	export let form;
	const { form: formData } = form;
</script>

<Form.Field {form} name="username">
	<Form.Control let:attrs>
		<Form.Label>Username</Form.Label>
		<Input {...attrs} bind:value={$formData.username} />
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
<!-- <Form.Field {form} name="email">
	<Form.Control let:attrs>
		<Form.Label>Email</Form.Label>
		<Input {...attrs} bind:value={$formData.email} />
	</Form.Control>
	<Form.Description>The email is optional.</Form.Description>
	<Form.FieldErrors />
</Form.Field> -->

<Form.Field {form} name="password">
	<Form.Control let:attrs>
		<Form.Label>Password</Form.Label>
		<Input {...attrs} type="password" bind:value={$formData.password} />
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
