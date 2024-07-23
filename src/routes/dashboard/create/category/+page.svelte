<script>
	import { superForm } from 'sveltekit-superforms';
	import { CategoryForm } from '$lib/components/form';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { categorySchema } from '$lib/schemas/category';
	import { FormWrapper } from '$lib/components/form';

	export let data;
	const form = superForm(data.form, {
		validators: zodClient(categorySchema)
	});

	const { enhance } = form;
</script>

<FormWrapper {enhance} enctype="multipart/form-data" title="Category">
	<CategoryForm {form} />
</FormWrapper>
