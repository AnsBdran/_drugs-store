<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { drugItemSchema } from '$lib/schemas/drug-item';
	import { showToast } from '$lib/utils';
	import { FormWrapper } from '$lib/components/form';
	import { DrugItemForm } from '$lib/components/form';

	export let data: PageData;
	const form = superForm(data.form, {
		dataType: 'json',
		validators: zodClient(drugItemSchema),
		onUpdated({ form }) {
			showToast(form);
		}
	});
	const { enhance, capture, restore } = form;
	export const snapshot = { capture, restore };
</script>

<FormWrapper {enhance} enctype="multipart/form-data" title="Drug item">
	<DrugItemForm {form} drugs={data.drugs} info={data.info} />
</FormWrapper>
