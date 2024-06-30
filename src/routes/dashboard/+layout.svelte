<script>
	import { Button } from '$lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer';
	import { dashboardLinks } from '$lib/links';

	// icons
	import SolarListBold from '~icons/solar/list-bold';
</script>

<Drawer.Root>
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
</Drawer.Root>
<slot></slot>
