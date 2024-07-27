<script>
	import FormWrapper from '$lib/components/form/form-wrapper.svelte';
	import { requestSchema } from '$lib/schemas/request';
	import { RequestForm } from '$lib/components/form';
	export let data;
</script>

<FormWrapper
	schema={requestSchema}
	data={data.form}
	let:form
	title="Request a new drug"
	description="complete the form to submit a new request"
	note="You must provide either brand or generic name, others are optional"
	enctype="multipart/form-data"
>
	<RequestForm {form} />
</FormWrapper>
