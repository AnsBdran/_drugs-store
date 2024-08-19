<script lang="ts">
	import type { User } from '@prisma/client';
	import Select from './select.svelte';
	import Input from '../ui/input/input.svelte';
	import Label from '../ui/label/label.svelte';

	export let initialValues: User;
	export let form;
</script>

<div>
	<Label>First name</Label>
	<Input disabled value={initialValues.firstName} />
</div>
<div>
	<Label>Last name</Label>
	<Input disabled value={initialValues.firstName} />
</div>
<div>
	<Label>Username</Label>
	<Input value={initialValues.username} disabled />
</div>
<div>
	<Label>Email</Label>
	<Input value={initialValues.email} disabled />
</div>

<input type="hidden" name="_id" value={initialValues.id} />

<Select
	{form}
	label="Change the user role"
	options={[
		{ value: 'USER', label: 'User' },
		{ value: 'ADMIN', label: 'Admin' },
		{ value: 'SUPER_ADMIN', label: 'Super Admin' }
	]}
	path={['role']}
/>
