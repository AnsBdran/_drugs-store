<script lang="ts">
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import Input from '$lib/components/ui/input/input.svelte';

	// export let options: string[];
</script>

<section class="bg-secondary/40">
	<Input class="w-max py-2" placeholder="Serach a drug..." />
</section>

<!-- <ToggleGroup.Root type="multiple" class="flex-wrap">
	{#each options as option}
		<ToggleGroup.Item value={option} aria-label="toggle {option}">
			{option}
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root> -->
