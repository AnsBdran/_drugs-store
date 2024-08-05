<script>
	import { cn } from '$lib/utils';
	import LogosWhatsapp from '~icons/logos/whatsapp';
	import Button from './ui/button/button.svelte';
	let className = '';
	export { className as class };
</script>

<footer
	class={cn(
		'relative mt-2 border-t-2 border-muted-foreground/20 bg-muted px-4 pt-12 shadow-xl dark:bg-gray-900 dark:text-muted-foreground',
		className
	)}
>
	<!-- <div
		class="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-white p-2"
	>
		<img class="h-full object-contain" src="/images/logo-circle.png" alt="" />
	</div> -->
	<div class="flex justify-between px-8">
		<nav
			aria-label="Footer Navigation"
			class="mb-1 flex max-w-lg flex-col justify-center gap-3 sm:flex-row sm:text-left"
		>
			<a href="/" class="font-medium">Demo</a>
			<a href="/" class="font-medium">Support</a>
			<a
				href="https://api.whatsapp.com/send?phone=972599428059&text=Hello_world"
				class="font-medium"
				target="_blank">Cotact me</a
			>
			<a href="/requests/create" class="font-medium">Request a drug</a>
		</nav>
		<div class="flex flex-col items-stretch">
			<Button href="/" class="" variant="ghost">
				<LogosWhatsapp class="size-20" />
			</Button>
			<Button variant="ghost">Telegram</Button>
		</div>
	</div>
	<p class="pb-3 text-center">
		© {new Date().getFullYear()} <span class=""> Badran </span>
		| All Rights Reserved
	</p>
</footer>
