<script lang="ts">
	import { dimensions } from '$lib/stores/dimensions';
	import type { Image } from '@prisma/client';
	import { CldImage } from 'svelte-cloudinary';
	import * as Popover from '$lib/components/ui/popover';
	import * as Form from '$lib/components/ui/form';
	import * as Dialog from '$lib/components/ui/dialog';
	import { enhance as _enhance } from '$app/forms';

	import { Combo } from '$lib/components/form';
	import { makeSelectItemsFromDrugItems } from '$lib/utils';

	// icons
	import HugeiconsCheckmarkSquare03 from '~icons/hugeicons/checkmark-square-03';
	import Button from './ui/button/button.svelte';
	import PhPaperclip from '~icons/ph/paperclip';
	import MaterialSymbolsLightDeleteOutline from '~icons/material-symbols-light/delete-outline';
	import type { Infer, SuperForm } from 'sveltekit-superforms';
	import type { ImageSchema } from '$lib/schemas/image';
	import Checkbox from './ui/checkbox/checkbox.svelte';
	import Loading from './loading.svelte';
	import { toast } from 'svelte-sonner';

	const { store } = dimensions;
	export let image: Image;
	$: width = $store.width;
	$: height = $store.height;

	let loading = false;
	export let drugItems;
	export let form: SuperForm<Infer<ImageSchema>>;
	const { enhance, delayed, form: formData, reset } = form;
</script>

<!-- <SuperDebug data={$formData} /> -->
<div style="width:{width}px;" class="group cursor-pointer overflow-hidden">
	<div
		style="width: {width}px; height: {height}px;"
		class="relative border-2 border-accent hover:border-transparent"
	>
		<CldImage
			src={image.publicID}
			class="h-full w-full object-cover"
			height={image.height}
			width={image.width}
		/>
		{#if image.drugItemID}
			<HugeiconsCheckmarkSquare03 class="absolute left-2 top-2" />
			<div
				class="absolute inset-0 hidden items-center justify-center bg-background/80 text-foreground transition-all duration-700 group-hover:flex"
			>
				<span class="text-xl font-semibold tracking-wide">{image.drugItem.drug.brandName}</span>
			</div>
		{/if}
	</div>
	<div class="flex justify-end py-1 [&>*]:size-7">
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
							loading = true;
							return ({ result, update }) => {
								update();
								loading = false;
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
							{#if loading}
								<Loading class="bg-destructive-foreground" />
							{:else}
								Confirm
							{/if}
						</Button>
					</form>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
		<Popover.Root
			onOpenChange={() => {
				reset();
				Object.assign($formData, {
					drugItemID: image.drugItemID ?? '',
					isPrimary: image.isPrimary,
					imageID: image.id
				});
				console.log('Form data initialized:', $formData); // Debug statement
			}}
		>
			<Popover.Trigger asChild let:builder>
				<Button size="icon" variant="ghost" builders={[builder]}><PhPaperclip /></Button>
			</Popover.Trigger>
			<Popover.Content>
				<div class="!m-0 space-y-2">
					<h4 class="text-lg font-medium leading-none">Edit the image link</h4>
					<p class="text-sm text-muted-foreground">Select a drug item to link the image to.</p>
				</div>
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
					<Form.Field {form} name="isPrimary">
						<Form.Control let:attrs>
							<Checkbox {...attrs} bind:checked={$formData.isPrimary} />
							<Form.Label>Mark this image as primary</Form.Label>
						</Form.Control>
					</Form.Field>
					<Button type="submit">
						{#if $delayed}
							<Loading class="bg-primary-foreground" />
						{:else}
							Edit
						{/if}
					</Button>
				</form>
			</Popover.Content>
		</Popover.Root>
	</div>
</div>
