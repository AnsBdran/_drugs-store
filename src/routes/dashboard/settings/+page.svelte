<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let data;
	const { itemsPerPage } = data.settings;

	let _pageSize = itemsPerPage;
</script>

<h2>Settings page</h2>

<h3>Items count shown per page: {_pageSize}</h3>
<Label class="label">Items shown per page</Label>
<div class="flex gap-2">
	<Input bind:value={_pageSize} type="number" />
	<Button disabled={_pageSize === itemsPerPage || !_pageSize}>update</Button>
</div>

<style>
	.label {
		margin-bottom: 1rem;
	}
</style>
