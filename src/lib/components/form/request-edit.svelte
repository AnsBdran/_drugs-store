<script lang="ts">
	import type { Infer, SuperForm } from 'sveltekit-superforms';
	import RequestForm from './request.svelte';
	import type { RequestSchema } from '$lib/schemas/request';
	import * as Form from '$lib/components/ui/form';
	import Input from '../ui/input/input.svelte';
	import Select from './select.svelte';

	export let form: SuperForm<Infer<RequestSchema>>;
	export let initialValues: Request;
	const { form: formData } = form;
</script>

<RequestForm {form} {initialValues} />
<Select
	{form}
	label="Edit the request status"
	options={['PENDING', 'ACCEPTED', 'REJECTED'].map((s) => ({ value: s, label: s }))}
	path={['responseStatus']}
/>
