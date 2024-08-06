<script lang="ts">
	import { dimensions } from '$lib/stores/dimensions';
	import type { Image } from '@prisma/client';
	import { CldImage } from 'svelte-cloudinary';

	// icons
	import HugeiconsCheckmarkSquare03 from '~icons/hugeicons/checkmark-square-03';

	const { store } = dimensions;
	export let image: Image;
	$: width = $store.width;
	$: height = $store.height;

	console.log('image received', image);
</script>

<div
	style="width:{width}px;"
	class="group cursor-pointer overflow-hidden border-2 border-accent hover:border-transparent"
>
	<div style="width: {width}px; height: {height}px;" class="relative">
		<CldImage
			src={image.publicID}
			class="h-full w-full object-cover"
			height={image.height}
			width={image.width}
		/>
		<HugeiconsCheckmarkSquare03 class="absolute left-2 top-2" />
		<div
			class="absolute inset-0 hidden items-center justify-center bg-background/80 text-foreground transition-all duration-700 group-hover:flex"
		>
			<span>Shown</span>
		</div>
		<!-- {#if image.drugItemID}
		{/if} -->
	</div>
</div>
