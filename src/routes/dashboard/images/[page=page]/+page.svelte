<script>
	import { ImageCard } from '$lib/components';
	import { dimensions } from '$lib/stores/dimensions';
	import { showToast } from '$lib/utils';
	import { onMount } from 'svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';

	export let data;
	// const { images, drugItems } = data;

	const form = superForm(data.form, {
		// validators: zodClient(imageSchema),
		onUpdate: ({ form }) => {
			showToast(form);
		},
		onSubmit: ({ formData }) => {
			const data = Object.fromEntries(formData);
		}
	});
	onMount(() => {
		const cleanup = dimensions.initialize();
		return cleanup;
	});
	const { form: formData } = form;
</script>

<h2><span class="text-primary">Images</span> Page {data.page}</h2>

<section class="cards-wrapper">
	{#each data.images as image}
		<ImageCard {image} drugItems={data.drugItems} {form} />
	{/each}
</section>
