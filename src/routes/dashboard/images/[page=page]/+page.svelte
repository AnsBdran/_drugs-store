<script>
	import { ImageCard } from '$lib/components';
	import { dimensions } from '$lib/stores/dimensions';
	import { onMount } from 'svelte';
	import { CldImage } from 'svelte-cloudinary';

	export let data;
	const images = data.images;
	const { store } = dimensions;

	onMount(() => {
		const cleanup = dimensions.initialize();
		return cleanup;
	});
	$: width = $store.width;
	$: height = $store.height;
</script>

<h2><span class="text-primary">Images</span> Page {data.page}</h2>

<section class="cards-wrapper 900:grid-cols-2 lg:grid-cols-3">
	{#each images as image}
		<ImageCard {image} />
	{/each}
</section>
