<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Header } from '$lib/components';
	import { Toaster } from '$lib/components/ui/sonner';

	export let data;
</script>

<svelte:head>
	<title>Al-Kamal pharmacy</title>
</svelte:head>

<Toaster />
<ModeWatcher />
<Header username={data.username} />
<main class="container mx-auto mb-16 mt-header py-8 md:mb-0">
	<slot></slot>
</main>

<style></style>
