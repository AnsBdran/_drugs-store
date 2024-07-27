<script lang="ts">
	import { drugSchema } from '$lib/schemas/drug';
	import { DrugForm } from '$lib/components/form';
	import { FormWrapper } from '$lib/components/form';

	export let data;
</script>

<FormWrapper title="Drug" data={data.form} let:form schema={drugSchema}>
	<DrugForm {form} info={data.info} manufacturers={data.manufacturers} />
</FormWrapper>
