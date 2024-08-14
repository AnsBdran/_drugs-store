<script lang="ts">
	import type { PageData } from './$types';
	import { drugItemSchema } from '$lib/schemas/drug-item';
	import { FormWrapper } from '$lib/components/form';
	import { DrugItemForm } from '$lib/components/form';

	export let data: PageData;
</script>

<FormWrapper
	schema={drugItemSchema}
	data={data.form}
	enctype="multipart/form-data"
	title="Drug item"
	let:form
>
	<DrugItemForm {form} drugs={data.drugs} info={data.info} />
</FormWrapper>
