<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Header } from '$lib/components';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<Toaster />
<ModeWatcher />
<Header />
<main class="container mx-auto pb-16 md:pb-0">
	<slot></slot>
</main>

<style></style>
