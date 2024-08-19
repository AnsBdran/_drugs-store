<script>
	import { ImageCard } from '$lib/components';
	import Button from '$lib/components/ui/button/button.svelte';
	import { dimensions } from '$lib/stores/dimensions';
	import { onMount } from 'svelte';
	import { CldUploadWidget } from 'svelte-cloudinary';
	import { superForm } from 'sveltekit-superforms';
	import IconParkOutlineUploadPicture from '~icons/icon-park-outline/upload-picture';

	export let data;

	const form = superForm(data.form);

	const onUpload = async (res, ser) => {
		const formData = new FormData();
		formData.append('info', JSON.stringify(res.info));
		const response = await fetch('/dashboard/images', {
			method: 'POST',
			body: formData
		});
		const parsed = await response.json();
	};
</script>

<div class="mb-12 flex items-end gap-8">
	<h2 class="flex-1">Images</h2>
	<CldUploadWidget
		let:open
		let:isLoading
		signatureEndpoint="/api/cloudinary"
		{onUpload}
		options={{
			folder: 'drugs-store'
		}}
	>
		<Button disabled={isLoading} on:click={open} size="icon" variant="secondary"
			><IconParkOutlineUploadPicture /></Button
		>
	</CldUploadWidget>
</div>
<h2>Latest added images</h2>
{#await data.images}
	<p>loading</p>
{:then images}
	{#each images as image}
		<ImageCard drugItems={data.drugItems} {form} {image} />
	{/each}
{/await}
<Button href="/dashboard/images/1">Browse all images</Button>
