<script lang="ts">
	import ThemeToggle from './theme-toggle.svelte';
	import { Button } from '$lib/components/ui/button';
	import { navLinks } from '$lib/links';
	import BottomNavbar from './bottom-navbar.svelte';

	// icons
</script>

<header class="">
	<section class=" container flex items-center justify-between py-2">
		<Button href="/" class="text-xl font-semibold" variant="link">Store</Button>
		<div class="flex items-center space-x-3">
			<ul class="hidden items-center md:flex">
				{#each navLinks as navLink}
					<li>
						<Button variant="link" href={navLink.href}>{navLink.name}</Button>
					</li>
				{/each}
			</ul>
			<ThemeToggle />
			<Button href="/login">Login</Button>
		</div>
	</section>
	<BottomNavbar />
</header>
