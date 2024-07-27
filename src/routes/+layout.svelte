<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Breadcrumb, Header } from '$lib/components';
	import { Toaster } from '$lib/components/ui/sonner';
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';

	export let data;
</script>

<svelte:head>
	<title>Al-Kamal pharmacy</title>
</svelte:head>

<Toaster />
<ModeWatcher />
<Header user={data.user} />
<main
	class={cn('container mx-auto mb-16 mt-header py-8 md:mb-0', {
		'md:pl-[calc(var(--sidebar)_+24px)]': $page.url.pathname.startsWith('/dashboard')
	})}
>
	<Breadcrumb
		class="mb-4 w-max rounded-md border border-accent bg-secondary/80 px-4 py-1 shadow-sm dark:border-muted dark:bg-secondary/20"
	/>
	<slot></slot>
</main>
