<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Alert from '$lib/components/ui/alert';
	import Button from '../ui/button/button.svelte';
	export let name: string = 'a';

	const refreshPage = () => {
		const target = window.location.pathname;
		console.log('target', target);
		goto(target);
	};
</script>

<Alert.Root variant="destructive" about="hi">
	<div class="flex items-center justify-between">
		<div>
			<Alert.Title>Error loading `{name}` form field.</Alert.Title>
			<Alert.Description>Please refresh the page to retry update the form.</Alert.Description>
		</div>
		<Button
			size="sm"
			class="border border-destructive bg-background text-destructive hover:border-transparent hover:bg-destructive hover:text-foreground"
			on:click={refreshPage}>Refresh</Button
		>
	</div>
</Alert.Root>
