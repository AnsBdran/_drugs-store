<script>
	export let data;
	import { page } from '$app/stores';
	console.log('page in svelte', $page);
</script>

<h2>in /product {data.label}</h2>
