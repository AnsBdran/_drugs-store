<script>
	import { navLinks } from '$lib/links';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
</script>

<section
	class="fixed bottom-0 left-0 z-50 flex w-full justify-around border border-accent bg-background shadow-xl md:hidden"
>
	{#each navLinks as link (link.href)}
		<a
			href={link.href}
			class={cn(
				'flex h-14 w-24 flex-1 flex-col items-center justify-center gap-1 rounded-sm  px-4 py-1 text-xs font-medium',
				{
					'bg-accent text-3xl font-semibold text-accent-foreground ':
						$page.url.pathname === link.href
				}
			)}
		>
			<svelte:component this={link.icon} class="h-6 w-6" />
			<span class="text-sm">{link.name}</span>
		</a>
	{/each}
</section>
