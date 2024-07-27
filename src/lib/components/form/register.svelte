<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { Infer, SuperForm } from 'sveltekit-superforms';
	import { Input } from '../ui/input';
	import type { RegisterSchema } from '$lib/schemas/auth';

	// props
	export let form: SuperForm<Infer<RegisterSchema>>;
	const { form: formData } = form;
</script>

<div class="flex gap-2">
	<Form.Field {form} name="firstName">
		<Form.Control let:attrs>
			<Form.Label>First name</Form.Label>
			<Input {...attrs} bind:value={$formData.firstName} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="lastName">
		<Form.Control let:attrs>
			<Form.Label>Last name</Form.Label>
			<Input {...attrs} bind:value={$formData.lastName} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</div>

<Form.Field {form} name="username">
	<Form.Control let:attrs>
		<Form.Label>Username</Form.Label>
		<Input {...attrs} bind:value={$formData.username} />
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>

<Form.Field {form} name="email">
	<Form.Control let:attrs>
		<Form.Label>Email</Form.Label>
		<Input {...attrs} bind:value={$formData.email} />
		<Form.Description>The email is optional.</Form.Description>
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>

<Form.Field {form} name="password">
	<Form.Control let:attrs>
		<Form.Label>Password</Form.Label>
		<Input {...attrs} type="password" bind:value={$formData.password} />
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>

<Form.Field {form} name="confirmPassword">
	<Form.Control let:attrs>
		<Form.Label>Confirm Password</Form.Label>
		<Input {...attrs} type="password" bind:value={$formData.confirmPassword} />
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
