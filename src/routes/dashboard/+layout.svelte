<script>
	import { Button } from '$lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer';
	import { dashboardLinks } from '$lib/links';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	// icons
	import SolarListBold from '~icons/solar/list-bold';
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';
	console.log($page.url.pathname);
</script>

<div class="flex justify-between">
	<h1>Dashboard</h1>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button size="icon">
				<SolarListBold class="scale-x-[-1] transform" />
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Label>Dashboard links</DropdownMenu.Label>
				<DropdownMenu.Separator />
			</DropdownMenu.Group>
			{#each dashboardLinks as link (link.href)}
				<DropdownMenu.Item
					href="/dashboard/{link.href}"
					disabled={link.href === ''
						? $page.url.pathname === '/dashboard'
						: $page.url.pathname.includes(link.href)}
					class="flex gap-6 px-4 py-3"
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
<!-- disabled={$page.url.pathname === '/dashboard'
	? $page.url.pathname === '/dashboard'
	: $page.url.pathname.includes(link.href) && $page.url.pathname !== '/dashboard'} -->

<!-- <Drawer.Root>
	<div class="flex justify-between">
		<h1>Dashboard</h1>
		<Drawer.Trigger>
			<Button size="icon">
				<SolarListBold class="scale-x-[-1] transform" />
			</Button>
		</Drawer.Trigger>
	</div>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Dashboard</Drawer.Title>
			<Drawer.Description>Choose a different route to navigate.</Drawer.Description>
		</Drawer.Header>
		<section class="flex flex-col">
			{#each dashboardLinks as link}
				<div class="">
					<a
						class="flex items-center gap-6 px-8 py-2 hover:bg-accent"
						href="/dashboard/{link.href}"
					>
						<svelte:component this={link.icon} /> {link.name}</a
					>
				</div>
			{/each}
		</section>
	</Drawer.Content>
</Drawer.Root> -->
<slot></slot>
