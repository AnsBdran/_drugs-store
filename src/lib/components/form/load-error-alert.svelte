<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import Button from '../ui/button/button.svelte';
	export let name: string = 'a';
	import { page } from '$app/stores';
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
			href={$page.url.pathname}
			data-sveltekit-reload>Refresh</Button
		>
	</div>
</Alert.Root>
