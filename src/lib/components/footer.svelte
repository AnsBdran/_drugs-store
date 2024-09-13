<script>
	import { cn } from '$lib/utils';
	import Button from './ui/button/button.svelte';
	let className = '';
	export { className as class };
</script>

<footer class={cn('footer  relative z-0  mt-2 px-4 pt-12', className)}>
	<!-- <div
		class="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-white p-2"
	>
		<img class="h-full object-contain" src="/images/logo-circle.png" alt="" />
	</div> -->
	<div class="container flex justify-between px-8 md:justify-around">
		<!-- class="mb-1 flex max-w-lg flex-col justify-center gap-3 sm:flex-row sm:text-left" -->
		<nav aria-label="Footer Navigation" class="footer-links">
			<a href="/">Demo</a>
			<a href="/">Support</a>
			<a href="https://api.whatsapp.com/send?phone=972599428059&text=Hello_world" target="_blank"
				>Cotact me</a
			>
			<a href="/requests/create">Request a drug</a>
		</nav>
		<nav class="footer-links">
			<a href="/" class="">Whatsapp</a>
			<a href="/">Telegram</a>
		</nav>
	</div>
	<p class="pb-3 text-center">
		© {new Date().getFullYear()} <span class=""> Badran - </span>
		All Rights Reserved
	</p>
</footer>
