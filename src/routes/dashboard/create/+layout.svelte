<script>
	import { page } from '$app/stores';
	import { dashboardCreateLinks } from '$lib/links';
	import { cn } from '$lib/utils';
</script>

<h2>Create new things</h2>

<nav>
	<ul
		class="mt-4 flex w-full items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
	>
		{#each dashboardCreateLinks as link}
			<li class=" flex-1">
				<a
					href={`/dashboard/create/${link.href}`}
					class={cn(
						'xs:text-sm inline-flex w-full items-center justify-center gap-1 whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none  disabled:opacity-50',
						{
							'bg-background text-foreground shadow':
								$page.url.pathname === `/dashboard/create/${link.href}`
						}
					)}
				>
					<svelte:component this={link.icon} class="xs:inline-block hidden" />
					{link.name}</a
				>
			</li>
		{/each}
	</ul>
</nav>

<section
	class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
>
	<slot />
</section>
