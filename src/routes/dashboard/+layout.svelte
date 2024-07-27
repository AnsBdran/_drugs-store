<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { dashboardLinks } from '$lib/links';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { page } from '$app/stores';

	// icons
	import StreamlineInterfaceHierarchy2NodeOrganizationLinksStructureLinkNodesNetworkHierarchy from '~icons/streamline/interface-hierarchy-2-node-organization-links-structure-link-nodes-network-hierarchy';
	import { cn } from '$lib/utils';

	$: isActive = (href: string) =>
		href === '' ? $page.url.pathname === '/dashboard' : $page.url.pathname.includes(href);
</script>

<div
	class="fixed bottom-0 left-0 top-header z-40 hidden h-screen w-sidebar border-r border-muted md:block"
>
	<ul>
		{#each dashboardLinks as link (link.href)}
			<li>
				<a
					href="/dashboard/{link.href}"
					class={cn('flex cursor-pointer gap-6 px-4 py-3', {
						'bg-accent text-accent-foreground': isActive(link.href)
					})}
				>
					<svelte:component this={link.icon} />
					<span>
						{link.name}
					</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<!-- On small screens -->
<div class="mb-8 flex justify-between md:hidden">
	<h1 class="mb-0">Dashboard</h1>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button size="icon">
				<StreamlineInterfaceHierarchy2NodeOrganizationLinksStructureLinkNodesNetworkHierarchy
					class=""
				/>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Label>Click to navigate</DropdownMenu.Label>
				<DropdownMenu.Separator />
			</DropdownMenu.Group>
			{#each dashboardLinks as link (link.href)}
				<DropdownMenu.Item
					href="/dashboard/{link.href}"
					disabled={isActive(link.href)}
					class="flex cursor-pointer gap-6 px-4 py-3"
				>
					<svelte:component this={link.icon} />
					<span>
						{link.name}
					</span>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
<div class="">
	<h1 class="mb-0 hidden md:block">Dashboard</h1>
	<slot></slot>
</div>
