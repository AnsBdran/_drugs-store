<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { drugSchema } from './schema';
	import { DrugForm } from '$lib/components/forms';
	import FormWrapper from '$lib/components/form-wrapper.svelte';

	// props
	export let data: PageData;
	const form = superForm(data.form, {
		dataType: 'json',
		validators: zodClient(drugSchema)
	});
	const { enhance } = form;
</script>

<FormWrapper {enhance} title="Drug">
	<DrugForm {form} info={data.info} manufacturers={data.manufacturers} />
</FormWrapper>
