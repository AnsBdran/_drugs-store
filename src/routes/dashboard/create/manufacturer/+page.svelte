<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { manufacturerSchema } from '$lib/schemas/manufacturer';
	import { ManufacturerForm } from '$lib/components/form';
	import FormWrapper from '$lib/components/form/form-wrapper.svelte';
	export let data: PageData;
	// const form = superForm(data.form, {
	// 	validators: zodClient(manufacturerSchema)
	// });

	// const { form: formData, enhance, delayed } = form;
</script>

<FormWrapper data={data.form} title="Manufacturer" schema={manufacturerSchema} let:form>
	<ManufacturerForm {form} />
</FormWrapper>
