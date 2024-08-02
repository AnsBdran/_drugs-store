<script>
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';

	export let data;
	const { links } = data;
</script>

<h1>All products</h1>
<Input placeholder="search..." />
<ul>
	{#each links as link}
		<li class="">
			<Button variant="link" href={link.href}>{link.label}</Button>
		</li>
	{/each}
</ul>
