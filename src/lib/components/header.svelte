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
	import ClarityFavoriteSolid from '~icons/clarity/favorite-solid';
	import PhSignOut from '~icons/ph/sign-out';
	import MaterialSymbolsShoppingBagOutline from '~icons/material-symbols/shopping-bag-outline';
	import MaterialSymbolsAccountBoxOutlineSharp from '~icons/material-symbols/account-box-outline-sharp';
	export let user: User | null;

	let className = '';
	export { className as class };
	// console.log('user in header', user);
	// icons
	let form: HTMLFormElement;
	$: isActive = (href: string) =>
		href === '/' ? $page.url.pathname === href : $page.url.pathname.startsWith(href);

	const handleLogout = () => {
		fetch('/logout', {
			method: 'POST'
		});
	};
</script>

<header
	class={cn(
		'fixed left-0 right-0 top-0 isolate z-40 h-header border-b border-muted bg-background/80 shadow-sm ring-1 ring-foreground/5',
		className
	)}
>
	<section class=" container flex items-center justify-between py-2">
		<Button href="/" class="text-xl font-semibold" variant="link">Store</Button>
		<!-- <p>{$cart[0].name}</p> -->
		<div class="flex items-center space-x-3">
			<ul class="hidden items-center md:flex">
				{#each navLinks as navLink (navLink.href)}
					<li>
						<Button
							variant="link"
							class={cn('text-secondary-foreground active:bg-primary/5 active:text-primary/60', {
								'pointer-events-none bg-primary/10 text-primary': isActive(navLink.href)
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
							<DropdownMenu.Item href="/cart"
								>My cart
								<DropdownMenu.Shortcut><MaterialSymbolsShoppingBagOutline /></DropdownMenu.Shortcut>
							</DropdownMenu.Item>
							<DropdownMenu.Item href="/favorites"
								>My favorites
								<DropdownMenu.Shortcut><ClarityFavoriteSolid /></DropdownMenu.Shortcut>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<form bind:this={form} action="/auth?/logout" method="post" use:enhance>
								<DropdownMenu.Item
									on:click={() => form.requestSubmit()}
									class="bg-destructive/10  text-destructive transition-all hover:bg-destructive/15 dark:text-destructive dark:hover:bg-destructive/15"
								>
									Sign out
									<DropdownMenu.Shortcut><PhSignOut /></DropdownMenu.Shortcut>
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
