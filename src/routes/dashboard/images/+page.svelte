<script>
	import { ImageCard } from '$lib/components';
	import ImageCardSkeleton from '$lib/components/skeletons/image-card-skeleton.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ITEMS_PER_PAGE } from '$lib/constants';
	import { dimensions } from '$lib/stores/dimensions';
	import { onMount } from 'svelte';
	import { CldUploadWidget } from 'svelte-cloudinary';
	import { superForm } from 'sveltekit-superforms';
	import IconParkOutlineUploadPicture from '~icons/icon-park-outline/upload-picture';

	export let data;
	const { store } = dimensions;

	const form = superForm(data.form);

	const onUpload = async (res) => {
		const formData = new FormData();
		formData.append('info', JSON.stringify(res.info));
		const response = await fetch('/dashboard/images', {
			method: 'POST',
			body: formData
		});
		const parsed = await response.json();
	};

	onMount(() => {
		const cleanup = dimensions.initialize();
		return cleanup;
	});
</script>

<div class="mb-12 items-center gap-8 sm:flex">
	<h2 class="flex-1">Latest added Images</h2>
	<CldUploadWidget
		let:open
		let:isLoading
		signatureEndpoint="/api/cloudinary"
		{onUpload}
		options={{
			folder: 'drugs-store'
		}}
	>
		<Button on:click={open} variant="secondary" class="gap-2"
			>Add new<IconParkOutlineUploadPicture /></Button
		>
	</CldUploadWidget>
	<Button href="/dashboard/images/1">Browse all images</Button>
</div>
<section class="cards-wrapper">
	{#await data.images}
		{#each Array(ITEMS_PER_PAGE).fill(0) as _, i}
			<ImageCardSkeleton />
		{/each}
	{:then images}
		{#each images as image}
			<ImageCard
				width={$store.width}
				height={$store.height}
				drugItems={data.drugItems}
				{form}
				{image}
			/>
		{/each}
	{/await}
</section>
