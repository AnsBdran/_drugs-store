<script>
	import { superForm } from 'sveltekit-superforms';
	import { CategoryForm } from '$lib/components/forms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { categoryFormSchema } from './schema';
	import FormWrapper from '$lib/components/form-wrapper.svelte';

	export let data;
	const form = superForm(data.form, {
		validators: zodClient(categoryFormSchema)
	});

	const { enhance } = form;
</script>

<FormWrapper {enhance} enctype="multipart/form-data" title="Category">
	<CategoryForm {form} />
</FormWrapper>
