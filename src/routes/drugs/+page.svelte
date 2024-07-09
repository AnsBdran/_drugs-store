<script lang="ts">
	import { DrugCard } from '$lib/components';
	import { drugItems } from '$lib/mock-data';
	import { onMount } from 'svelte';

	$: width = 150;
	$: height = 150;

	const updateDimensions = () => {
		// if (window.innerWidth > 1024) {
		if (window.innerWidth > 800) {
			width = 250;
			height = 350;
		} else {
			width = 150;
			height = 150;
		}
	};

	onMount(() => {
		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	});
</script>

<h1>Hello, drugs</h1>

<section
	class="grid grid-cols-2 place-items-center gap-4 xs:grid-cols-3 sm:grid-cols-4 sm:gap-8 md:grid-cols-3 md:gap-12 lg:grid-cols-4 lg:gap-16 xl:grid-cols-5"
>
	{#each drugItems as drug}
		<DrugCard {drug} class="w-[{width}px]" {width} {height} />
	{/each}
</section>
