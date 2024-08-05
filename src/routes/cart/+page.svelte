<script>
	import { CartItem } from '$lib/components';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { cart } from '$lib/stores/cart';
	import IconoirDeliveryTruck from '~icons/iconoir/delivery-truck';
	import AntDesignDeleteOutlined from '~icons/ant-design/delete-outlined';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Popover from '$lib/components/ui/popover';
	import { formatCartItem } from '$lib/utils';
	import * as Alert from '$lib/components/ui/alert';
	let isDialogOpen = false;
	let isPopoverOpen = false;
	const clear = () => {
		window.localStorage.removeItem('cart');
		cart.set([]);
	};

	const phoneNumber = 972597866163;
	const sayHi = encodeURIComponent('السلام عليكم دكتور محمد،\n أرغب بشراء الأصناف الآتية\n');
	$: value = encodeURIComponent($cart.map((i) => formatCartItem(i)).join('\n\n'));
	$: totalPrice = encodeURIComponent(
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
			<Alert.Root variant="destructive" class="bg-destructive/10">
				<Alert.Title>Your cart is empty</Alert.Title>
				<Alert.Description
					>First <Button
						variant="link"
						class="px-0 text-destructive underline hover:underline-offset-2">browse</Button
					> our products, and add things you like!</Alert.Description
				>
			</Alert.Root>
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
