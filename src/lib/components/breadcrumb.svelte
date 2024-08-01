<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	import { page } from '$app/stores';

	let className = '';

	export { className as class };

	let crumbs: Array<{ label: string; href: string }> = [];

	$: {
		// Remove zero-length tokens.
		const tokens = $page.url.pathname.split('/').filter((t) => t !== '');
		console.log('in crumbs', $page);
		// Create { label, href } pairs for each token.
		let tokenPath = '';
		crumbs = tokens.map((t, index) => {
			tokenPath += '/' + t;

			// Handle special case for product/[id] route
			if (index === 0 && t === 'product') {
				return { label: 'Product', href: tokenPath };
			} else if (index === tokens.length - 1) {
				return {
					label: $page.data.label || t.charAt(0).toUpperCase() + t.slice(1),
					href: tokenPath
				};
			} else {
				return { label: t.charAt(0).toUpperCase() + t.slice(1), href: tokenPath };
			}

			// t = t.charAt(0).toUpperCase() + t.slice(1);
			// return {
			// 	label: $page.data.label || t,
			// 	href: tokenPath
			// };
		});

		// Add a way to get home too.
		crumbs.unshift({ label: 'Home', href: '/' });
	}
</script>

<Breadcrumb.Root class={className}>
	<Breadcrumb.List>
		{#each crumbs as c, i}
			{#if i === crumbs.length - 1}
				<Breadcrumb.Item>
					{c.label}
				</Breadcrumb.Item>
			{:else}
				<Breadcrumb.Item>
					<Breadcrumb.Link href={c.href}>
						{c.label}
					</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
			{/if}
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>
