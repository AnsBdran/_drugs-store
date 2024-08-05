<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Breadcrumb, Footer, Header } from '$lib/components';
	import { Toaster } from '$lib/components/ui/sonner';
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';
	import { CldOgImage } from 'svelte-cloudinary';

	export let data;
</script>

<svelte:head>
	<title>Al-Kamal pharmacy</title>
</svelte:head>
<CldOgImage
	src="Designer.jpeg"
	height="250"
	width="350"
	alt="Pharmacy store"
	title="Al-kamal Pharmacy"
	text="Welcome to our store, we hope you have a nice day."
/>
<!-- <img src="Designer.jpeg" alt="designer" /> -->
<Toaster />
<ModeWatcher />

<div
	class={cn('flex min-h-screen flex-col justify-between pb-bottom-navbar pt-header md:pb-0', {})}
>
	<Header user={data.user} />
	<main
		class={cn('container mx-auto flex-1 py-6', {
			'md:pl-[calc(var(--sidebar)_+24px)]': $page.url.pathname.startsWith('/dashboard')
		})}
	>
		<Breadcrumb
			class="mb-4 w-max rounded-md border border-accent bg-secondary/80 px-4 py-1 shadow-sm dark:border-muted dark:bg-secondary/20"
		/>
		<slot></slot>
	</main>
	<Footer
		class={cn('mt-20', {
			'md:ml-[var(--sidebar)]': $page.url.pathname.startsWith('/dashboard')
		})}
	/>
</div>
