<script>
	import { MetadataForm } from '$lib/components/form';
	import { FormWrapper } from '$lib/components/form';
	import { metadataSchema } from '$lib/schemas/metdata';

	export let data;
</script>

<!-- <SuperDebug data={$formData} /> -->
<FormWrapper data={data.form} schema={metadataSchema} let:form title="Add new metadata">
	<MetadataForm {form} />
</FormWrapper>
