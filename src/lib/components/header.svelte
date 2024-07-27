<script lang="ts">
	import ThemeToggle from './theme-toggle.svelte';
	import { Button } from '$lib/components/ui/button';
	import { navLinks } from '$lib/links';
	import BottomNavbar from './bottom-navbar.svelte';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { enhance } from '$app/forms';
	import type { User } from 'lucia';

	export let user: User | null;

	console.log('user in header', user);
	// icons

	$: isActive = (href: string) =>
		href === '/' ? $page.url.pathname === href : $page.url.pathname.includes(href);

	const handleLogout = () => {
		fetch('/logout', {
			method: 'POST'
		});
	};
</script>

<header
	class=" hs-header fixed left-0 right-0 top-0 isolate z-40 border-b border-muted bg-background/80 shadow-sm ring-1 ring-foreground/5"
>
	<section class=" container flex items-center justify-between py-2">
		<Button href="/" class="text-xl font-semibold" variant="link">Store</Button>
		<div class="flex items-center space-x-3">
			<ul class="hidden items-center md:flex">
				{#each navLinks as navLink (navLink.href)}
					<li>
						<Button
							variant="link"
							class={cn('active:bg-primary active:text-primary-foreground', {
								'bg-secondary text-secondary-foreground underline': isActive(navLink.href)
							})}
							href={navLink.href}>{navLink.name}</Button
						>
					</li>
				{/each}
			</ul>
			<ThemeToggle />
			{#if !user}
				<Button href="/auth">Login</Button>
			{:else}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root class="rounded-none shadow-lg duration-[8000ms]">
							<Avatar.Fallback
								class=" rounded-lg border border-gray-500 bg-gray-800 text-gray-50 transition-all hover:border-gray-300 "
							>
								{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
							</Avatar.Fallback>
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Label>Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item>My items</DropdownMenu.Item>
							<DropdownMenu.Item>Settings</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<form action="/auth?/logout" method="post" use:enhance>
								<DropdownMenu.Item class="text-destructive" asChild>
									<Button variant="destructive" class="w-full" type="submit">Sign out</Button>
								</DropdownMenu.Item>
							</form>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		</div>
	</section>
	<BottomNavbar />
</header>
