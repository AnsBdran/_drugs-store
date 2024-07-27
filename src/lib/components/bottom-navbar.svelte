<script>
	import { navLinks } from '$lib/links';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
</script>

<section class="fixed bottom-0 left-0 z-50 flex w-full justify-around bg-accent md:hidden">
	{#each navLinks as link (link.href)}
		<a
			href={link.href}
			class={cn(
				'flex h-12 flex-1 flex-col items-center justify-between gap-[2px] border-t bg-muted px-3 pb-1 pt-[5px] text-xs font-normal tracking-wider text-muted-foreground',
				{
					'border-t-accent-foreground/40 bg-muted-foreground/20':
						link.href === '/'
							? $page.url.pathname === '/'
							: $page.url.pathname.startsWith(link.href)
				}
			)}
		>
			<svelte:component this={link.icon} class="size-5" />
			<span class="text-xs">{link.name}</span>
		</a>
	{/each}
</section>
