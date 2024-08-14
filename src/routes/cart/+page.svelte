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
	import Alert from '$lib/components/alert.svelte';
	import Stat from '$lib/components/drugs/stat.svelte';
	import IconParkOutlineBill from '~icons/icon-park-outline/bill';
	import GridiconsProduct from '~icons/gridicons/product';
	let isDialogOpen = false;
	let isPopoverOpen = false;
	const clear = () => {
		window.localStorage.removeItem('cart');
		cart.set([]);
	};

	const phoneNumber = 972597866163;
	const sayHi = encodeURIComponent('السلام عليكم دكتور محمد،\n أرغب بشراء الأصناف الآتية\n');
	$: value = encodeURIComponent($cart.map((i) => formatCartItem(i)).join('\n\n'));
	$: totalPrice = $cart.reduce((p, n) => p + n.data.price.item * n.count, 0);
	$: totalPriceMsg = encodeURIComponent(`مجموع السعر: ${totalPrice} شيكل.`);
	8;
</script>

<div class="mb-8 flex items-center justify-between">
	<h1 class="mb-0">Cart page</h1>
</div>

<section class="flex flex-col justify-between md:flex-row md:items-center lg:gap-24">
	<div class="basis-80">
		{#if !$cart.length}
			<Alert title="Your cart is empty!" class="lg:min-w-96"
				>Browse products first, and add what you like to your cart.</Alert
			>
			<Button class="mt-8 text-primary-foreground">
				Browse Products
				<GridiconsProduct />
			</Button>
		{:else}
			{#each $cart as c}
				<CartItem item={c} />
				<Separator class="my-8 last:hidden" />
			{/each}
		{/if}
	</div>

	<div>
		<div>
			<Stat title="Total Price" icon={IconParkOutlineBill} value={totalPrice} class="mb-4" />
		</div>

		<div class="flex flex-col gap-6 sm:flex-row md:flex-col 900:flex-row">
			{#if $cart.length}
				<Button
					class="w-full self-stretch uppercase "
					href="https://wa.me/{phoneNumber}?text={sayHi}%0a%0a{value}%0a%0a%0a{totalPrice}"
					target="_blank"
					>Submit an order
					<IconoirDeliveryTruck class="size-6" />
				</Button>
				<Dialog.Root bind:open={isDialogOpen}>
					<Dialog.Trigger let:builder asChild>
						<Button
							builders={[builder]}
							disabled={!$cart.length}
							variant="destructive"
							class="w-full self-stretch uppercase text-destructive-foreground"
							>Clear the cart <AntDesignDeleteOutlined class="size-6" /></Button
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
						<Button builders={[builder]} class="w-full self-stretch uppercase"
							>Submit an order
							<IconoirDeliveryTruck class="size-6" />
						</Button>
					</Popover.Trigger>
					<Popover.Content>Try adding some items first</Popover.Content>
				</Popover.Root>

				<Popover.Root>
					<Popover.Trigger asChild let:builder>
						<Button builders={[builder]} variant="destructive" class="w-full self-stretch uppercase"
							>Clear the cart <AntDesignDeleteOutlined class="size-6" /></Button
						>
					</Popover.Trigger>
					<Popover.Content>The cart is already empty!</Popover.Content>
				</Popover.Root>
			{/if}
		</div>
	</div>
</section>
