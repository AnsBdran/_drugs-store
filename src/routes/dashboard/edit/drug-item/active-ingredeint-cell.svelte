<script>
	import Badge from '$lib/components/ui/badge/badge.svelte';

	export let content;
	console.log('the cell received', content);
</script>

{#each content as c}
	<Badge>{c.name}</Badge>
{/each}
