<script>
	import { CategoryForm } from '$lib/components/form';
	import { categorySchema } from '$lib/schemas/category';
	import { FormWrapper } from '$lib/components/form';

	export let data;
</script>

<FormWrapper
	data={data.form}
	schema={categorySchema}
	enctype="multipart/form-data"
	title="Category"
	let:form
>
	<CategoryForm {form} />
</FormWrapper>
