<script lang="ts">
	import { dimensions } from '$lib/stores/dimensions';
	import type { Image } from '@prisma/client';
	import { CldImage } from 'svelte-cloudinary';
	import * as Form from '$lib/components/ui/form';
	import * as Dialog from '$lib/components/ui/dialog';
	import { enhance as _enhance } from '$app/forms';
	import type { Infer, SuperForm } from 'sveltekit-superforms';
	import type { ImageSchema } from '$lib/schemas/image';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Loading from './loading.svelte';
	import { toast } from 'svelte-sonner';

	import { Combo } from '$lib/components/form';
	import { invalidateAll } from '$app/navigation';
	import { makeSelectItemsFromDrugItems } from '$lib/utils';

	// icons
	import MaterialSymbolsLightWorkspacePremiumOutline from '~icons/material-symbols-light/workspace-premium-outline';
	import HugeiconsCheckmarkSquare03 from '~icons/hugeicons/checkmark-square-03';
	import Button from './ui/button/button.svelte';
	import PhPaperclip from '~icons/ph/paperclip';
	import MaterialSymbolsLightDeleteOutline from '~icons/material-symbols-light/delete-outline';
	import OcticonUnlink24 from '~icons/octicon/unlink-24';
	import PhLinkLight from '~icons/ph/link-light';
	import Separator from './ui/separator/separator.svelte';
	import SuperDebug from 'sveltekit-superforms';
	const { store } = dimensions;
	export let image: Image;
	// $: width = $store.width;
	// $: height = $store.height;
	export let width;
	export let height;
	let deleteLoading = false;
	let unlinkLoading = false;
	export let drugItems;
	export let form: SuperForm<Infer<ImageSchema>>;
	const { enhance, delayed, form: formData, reset } = form;
	$: console.log('in card', width, height);
</script>

<div style="width:{width}px;" class="group cursor-pointer overflow-hidden">
	<div
		style="width: {width}px; height: {height}px;"
		class="relative border-2 border-muted-foreground/50 hover:border-transparent"
	>
		<img
			src={image.url}
			class="h-full w-full object-cover"
			height={image.height}
			width={image.width}
			alt="random item"
		/>
		<!-- <CldImage
			src={image.publicID}
			class="h-full w-full object-cover"
			height={image.height}
			width={image.width}
		/> -->
		{#if image.drugItemID}
			<div
				class="absolute inset-0 hidden items-center justify-center bg-background/80 text-foreground transition-all duration-700 group-hover:flex"
			>
				<span class="text-xl font-semibold tracking-wide">{image.drugItem.drug.brandName}</span>
			</div>
			<div class="absolute left-2 top-2 p-[2px]">
				<HugeiconsCheckmarkSquare03 />
			</div>
			{#if image.isPrimary}
				<MaterialSymbolsLightWorkspacePremiumOutline class="absolute right-2 top-2" />
			{/if}
		{/if}
	</div>

	<!-- actions buttons -->
	<!-- ============================================================== -->
	<!-- ============================================================== -->
	<div
		class="ml-auto mt-1 flex w-max justify-end border border-muted-foreground/50 bg-muted text-muted-foreground [&>button]:size-7 [&>button]:rounded-none"
	>
		<Dialog.Root>
			<Dialog.Trigger let:builder asChild>
				<Button size="icon" variant="ghost" type="submit" builders={[builder]}
					><MaterialSymbolsLightDeleteOutline /></Button
				>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Are you absolutely sure?</Dialog.Title>
					<Dialog.Description>
						This action cannot be undone. This will permanently delete the image.
					</Dialog.Description>
				</Dialog.Header>
				<Dialog.Footer class="">
					<form
						action="?/delete"
						use:_enhance={() => {
							deleteLoading = true;
							return ({ result, update }) => {
								update();
								deleteLoading = false;
								if (result.type === 'success') {
									toast(result.data);
								} else {
									toast('Something bad happened');
								}
							};
						}}
						class="flex justify-end"
						method="POST"
					>
						<input type="hidden" name="imageID" value={image.id} />
						<Button variant="destructive" type="submit">
							{#if deleteLoading}
								<Loading class="bg-destructive-foreground" />
							{:else}
								Delete
							{/if}
						</Button>
					</form>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>

		<Separator orientation="vertical" class="bg-muted-foreground/70" />

		<!-- Edit Section -->
		<!-- ============================================== -->
		<!-- ============================================== -->
		<Dialog.Root
			onOpenChange={() => {
				reset();
				if (image.drugItemID) {
					Object.assign($formData, {
						drugItemID: image.drugItemID,
						isPrimary: image.isPrimary
					});
				}
			}}
		>
			<Dialog.Trigger asChild let:builder>
				<Button size="icon" variant="ghost" builders={[builder]}><PhLinkLight /></Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<div class="!m-0 space-y-2">
						<h4 class="text-lg font-medium leading-none">Edit the image link</h4>
						<p class="text-sm text-muted-foreground">Select a drug item to link the image to.</p>
					</div>
				</Dialog.Header>
				<form method="post" action="?/edit" use:enhance class="space-y-3">
					<input type="hidden" name="imageID" value={image.id} />
					<div class="flex items-end">
						<Combo
							label="Slect the drug item"
							{form}
							path={['drugItemID']}
							options={makeSelectItemsFromDrugItems(drugItems)}
						/>
					</div>

					<!-- <Form.Field
						{form}
						name="isPrimary"
						class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
					>
						<Form.Control let:attrs>
							<Checkbox {...attrs} bind:checked={$formData.isPrimary} />
							<div class="space-y-2 leading-none">
								<Form.Label>Primary Image</Form.Label>
								<Form.Description
									>If you check this, the image will be the primary image that shows on the drug
									card.</Form.Description
								>
							</div>
						</Form.Control>
					</Form.Field> -->
					<div class="flex items-center gap-2">
						<input
							type="checkbox"
							name="isPrimary"
							bind:checked={$formData.isPrimary}
							id="isPrimary"
						/>
						<label for="isPrimary">Mark as Primary</label>
					</div>
					<!-- 
					<Form.Field {form} name="isPrimary">
						<Form.Control let:attrs>
							<Checkbox {...attrs} bind:checked={$formData.isPrimary} />
							<Form.Label>Mark this image as primary</Form.Label>
						</Form.Control>
					</Form.Field>

					<input type="checkbox" name="isPrimary" /> -->
					<div class="flex justify-end">
						<Button type="submit" class="w-max ">
							{#if $delayed}
								<Loading class="bg-primary-foreground" />
							{:else}
								Edit
							{/if}
						</Button>
					</div>
				</form>
			</Dialog.Content>
		</Dialog.Root>

		<Separator orientation="vertical" class="bg-muted-foreground/70" />
		<!-- Unlink section -->
		<!-- ============================================ -->
		<!-- ============================================ -->
		<Dialog.Root>
			<Dialog.Trigger let:builder asChild>
				<Button size="icon" variant="ghost" builders={[builder]} class="rounded-none ">
					<OcticonUnlink24 />
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
					<Dialog.Description>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</Dialog.Description>
				</Dialog.Header>
				<form
					action="?/unlink"
					method="POST"
					use:_enhance={() => {
						unlinkLoading = true;
						return ({ result, update }) => {
							if (result.type === 'success') {
								toast(result.data);
							} else {
								toast('smoething bad happened');
							}
							invalidateAll();
							update();
							unlinkLoading = false;
						};
					}}
				>
					<input type="hidden" name="imageID" value={image.id} />
					<div class="flex justify-end">
						<Button variant="destructive" class="w-20" type="submit">
							{#if unlinkLoading}
								<Loading class="bg-primary-foreground" />
							{:else}
								Unlink
							{/if}
						</Button>
					</div>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	</div>
</div>
