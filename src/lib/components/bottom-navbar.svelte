<script>
	import { navLinks } from '$lib/links';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import Separator from './ui/separator/separator.svelte';
</script>

<section
	class="bottom-navbar fixed bottom-0 left-0 flex h-bottom-navbar w-full justify-around md:hidden"
>
	{#each navLinks as link (link.href)}
		<a
			href={link.href}
			class={cn(
				'flex h-12 flex-1 flex-col items-center justify-between gap-[2px] border-t-2 border-t-transparent px-3 pb-2 pt-[5px] text-xs font-normal tracking-wider ',
				{
					'active-link pointer-events-none':
						// 'pointer-events-none border-t-primary/40 bg-primary/5 text-primary':
						link.href === '/'
							? $page.url.pathname === '/'
							: $page.url.pathname.startsWith(link.href)
				}
			)}
		>
			<svelte:component this={link.icon} class="size-5" />
			<span class="text-xs">{link.name}</span>
		</a>
		<!-- <Separator orientation="vertical" /> -->
	{/each}
</section>
