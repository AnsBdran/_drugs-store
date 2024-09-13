<div class="flex space-x-16 overflow-hidden">
	<div class="flex animate-loop-scroll space-x-16">
		<slot />
	</div>
	<div class="flex animate-loop-scroll space-x-16" aria-hidden="true">
		<slot />
	</div>
	<!-- <div class= "flex animate-loop-scroll space-x-16" aria-hidden="true">
		<slot />
	</div> -->
</div>

<!-- <slot /> -->
<!-- <div
	class="relative mb-8 flex items-center justify-center overflow-x-hidden bg-primary/40 text-primary-foreground shadow-inner [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
>
	<div class="marquee-content animate-marquee whitespace-nowrap px-12 py-4">
		<slot />
	</div>
	<div class="marquee-content absolute top-0 animate-_marquee whitespace-nowrap px-12 py-4">
		<slot />
	</div>
</div> -->

<!-- <style>
	:global(.marquee-content > *) {
		margin-bottom: 0;
	}
</style> -->
