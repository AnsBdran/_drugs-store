<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import manufacturerSchema from './schema';
	import { ManufacturerForm } from '$lib/components/forms';
	import FormWrapper from '$lib/components/form-wrapper.svelte';
	export let data: PageData;
	const form = superForm(data.form, {
		validators: zodClient(manufacturerSchema)
	});

	const { form: formData, enhance } = form;
</script>

<FormWrapper {enhance} title="Manufacturer">
	<ManufacturerForm {form} />
</FormWrapper>
