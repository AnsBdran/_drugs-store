<script>
	import { Button } from '$lib/components/ui/button';
	import { dashboardLinks } from '$lib/links';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { page } from '$app/stores';

	// icons
	import SolarListBold from '~icons/solar/list-bold';
</script>

<div class="mb-8 flex justify-between">
	<h1 class="mb-0">Dashboard</h1>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button size="icon">
				<SolarListBold class="scale-x-[-1] transform" />
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
					disabled={link.href === ''
						? $page.url.pathname === '/dashboard'
						: $page.url.pathname.includes(link.href)}
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
<slot></slot>
