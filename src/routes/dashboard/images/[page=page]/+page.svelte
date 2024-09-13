<script>
	import { ImageCard } from '$lib/components';
	import Pagination from '$lib/components/pagination.svelte';
	import DrugCardSkeleton from '$lib/components/skeletons/drug-card-skeleton.svelte';
	import ImageCardSkeleton from '$lib/components/skeletons/image-card-skeleton.svelte';
	import { ITEMS_PER_PAGE } from '$lib/constants';
	import { imageSchema } from '$lib/schemas/image';
	import { dimensions } from '$lib/stores/dimensions';
	import { fromNow, showToast } from '$lib/utils';
	import { onMount } from 'svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data;
	// let currentPage = 1;
	$: page = data.page;

	// const { images, drugItems } = data;

	const form = superForm(data.form, {
		validators: zodClient(imageSchema),
		onUpdate: ({ form }) => {
			showToast(form);
		}
	});
	const { store } = dimensions;
	onMount(() => {
		const cleanup = dimensions.initialize();
		return cleanup;
	});
	$: console.log('in parent', $store.height, $store.width);
	const { form: formData } = form;
</script>

<h2><span class="text-primary">Images</span> Page {data.page}</h2>

<section class="cards-wrapper">
	{#each Array.from({ length: ITEMS_PER_PAGE }) as _, i (i)}
		<ImageCardSkeleton width={$store.width} height={$store.height} />
	{/each}
</section>
<section class="cards-wrapper">
	{#await data.promise}
		{#each Array.from({ length: ITEMS_PER_PAGE }) as _, i (i)}
			<ImageCardSkeleton width={$store.width} height={$store.height} />
		{/each}
	{:then _data}
		{#each _data[0] as image}
			<ImageCard {image} drugItems={_data[1]} {form} width={$store.width} height={$store.height} />
		{/each}
	{/await}
</section>

{#await data.promise}
	{null}
{:then p}
	<Pagination count={p[2]} bind:page />
{/await}
