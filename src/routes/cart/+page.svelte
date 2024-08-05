<script>
	import { CartItem } from '$lib/components';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { cart } from '$lib/stores/cart';
	console.log($cart);
	import IconoirDeliveryTruck from '~icons/iconoir/delivery-truck';
	import PajamasExternalLink from '~icons/pajamas/external-link';
	import AntDesignDeleteOutlined from '~icons/ant-design/delete-outlined';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Popover from '$lib/components/ui/popover';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Input } from '$lib/components/ui/input';
	import { formatCartItem } from '$lib/utils';
	let isDialogOpen = false;
	let isPopoverOpen = false;
	const clear = () => {
		window.localStorage.removeItem('cart');
		cart.set([]);
	};

	const phoneNumber = 972597866163;
	const sayHi = encodeURIComponent('السلام عليكم دكتور محمد،\n أرغب بشراء الأصناف الآتية\n');
	const value = encodeURIComponent($cart.map((i) => formatCartItem(i)).join('\n\n'));
	const totalPrice = encodeURIComponent(
		`مجموع السعر: ${$cart.reduce((p, n) => p + n.data.price.item * n.count, 0)} شيكل.`
	);
	8;
</script>

<div class="mb-8 flex items-center justify-between">
	<h1 class="mb-0">Cart page</h1>
</div>

<section class="flex flex-col gap-24 md:flex-row">
	<div class="basis-80">
		{#if !$cart.length}
			<p>Your cart is empty</p>
		{:else}
			{#each $cart as c}
				<CartItem item={c} />
				<Separator class="my-8 last:hidden" />
			{/each}
		{/if}
	</div>

	<div class="flex gap-6 md:flex-col 900:flex-row">
		{#if $cart.length}
			<Button
				class="w-full gap-3 self-stretch uppercase md:h-12 md:text-lg"
				href="https://wa.me/{phoneNumber}?text={sayHi}%0a%0a{value}%0a%0a%0a{totalPrice}"
				target="_blank"
				>Submit an order
				<IconoirDeliveryTruck class="size-6 md:size-7" />
			</Button>
			<Dialog.Root bind:open={isDialogOpen}>
				<Dialog.Trigger let:builder asChild>
					<Button
						builders={[builder]}
						disabled={!$cart.length}
						variant="destructive"
						class="w-full gap-3 self-stretch uppercase md:h-12 md:text-lg"
						>Clear the cart <AntDesignDeleteOutlined class="size-6 md:size-7" /></Button
					></Dialog.Trigger
				>

				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
						<Dialog.Description>
							This action cannot be undone. This will permanently delete your cart items.
						</Dialog.Description>
					</Dialog.Header>
					<Dialog.Footer>
						<Button on:click={() => (isDialogOpen = false)}>Cancel</Button>
						<Button
							variant="destructive"
							on:click={() => {
								clear();
								isDialogOpen = false;
							}}>confirm</Button
						>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		{:else}
			<Popover.Root>
				<Popover.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						class="w-full gap-3 self-stretch uppercase md:h-12 md:text-lg"
						>Submit an order
						<IconoirDeliveryTruck class="size-6 md:size-7" />
					</Button>
				</Popover.Trigger>
				<Popover.Content>Try adding some items first</Popover.Content>
			</Popover.Root>

			<Popover.Root>
				<Popover.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="destructive"
						class="w-full gap-3 self-stretch uppercase md:h-12 md:text-lg"
						>Clear the cart <AntDesignDeleteOutlined class="size-6 md:size-7" /></Button
					>
				</Popover.Trigger>
				<Popover.Content>The cart is already empty!</Popover.Content>
			</Popover.Root>
		{/if}
	</div>
</section>
