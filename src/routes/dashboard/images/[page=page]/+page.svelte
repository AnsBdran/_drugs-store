<script>
	import { ImageCard } from '$lib/components';
	import { imageSchema } from '$lib/schemas/image';
	import { dimensions } from '$lib/stores/dimensions';
	import { showToast } from '$lib/utils';
	import { onMount } from 'svelte';
	import { CldImage } from 'svelte-cloudinary';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data;
	const { images, drugItems } = data;
	const { store } = dimensions;

	const form = superForm(data.form, {
		// validators: zodClient(imageSchema),
		onUpdate: ({ form }) => {
			showToast(form);
		}
	});
	const { form: formData } = form;
	onMount(() => {
		const cleanup = dimensions.initialize();
		return cleanup;
	});
	$: width = $store.width;
	$: height = $store.height;
</script>

<h2><span class="text-primary">Images</span> Page {data.page}</h2>

<SuperDebug data={$formData} />
<section class="cards-wrapper 900:grid-cols-2 lg:grid-cols-3">
	{#each images as image}
		<ImageCard {image} {drugItems} {form} />
	{/each}
</section>
