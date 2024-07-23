<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { DrugItem, Manufacturer } from '@prisma/client';
	import { rowChanges } from '$lib/stores/table.store';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import type { ManufacturerSchema } from '$lib/schemas/manufacturer';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import type { DrugItemSchema } from '$lib/schemas/drug-item';

	// props
	export let data: SuperValidated<Infer<ManufacturerSchema | DrugItemSchema>>;
	export let formComponent;

	const form = superForm(data, {
		dataType: 'json',
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success(form?.message?.text as string);
				setRow(false);
				invalidateAll();
			}
		}
	});

	const { enhance, delayed } = form;
	const setRow = (
		isEditOpen: boolean,
		isDeleteOpen: boolean = false,
		row: Manufacturer | DrugItem | null = null
	) => {
		console.log('received', row);
		// row?.imageURL ? delete row?.imageURL : null;
		console.log('deleted', row);
		rowChanges.set({ data: row, isEditOpen, isDeleteOpen });
	};
</script>

<Dialog.Root bind:open={$rowChanges.isEditOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit item {$rowChanges?.data?.name ?? ''}</Dialog.Title>
			<Dialog.Description>Complete the form to edit the item</Dialog.Description>
		</Dialog.Header>
		<form method="POST" action="?/edit" use:enhance enctype="multipart/form-data">
			<!-- form section -->
			<ScrollArea class="mb-3  h-[75vh] pr-3 shadow-inner">
				<svelte:component
					this={formComponent}
					{form}
					initialValues={$rowChanges.data}
					info={$$restProps.info}
					drugs={$$restProps.drugs}
				/>
			</ScrollArea>
			<input type="hidden" name="_id" value={$rowChanges.data?.id} />
			<Dialog.Footer>
				<Button on:click={() => setRow(false)} variant="destructive">Cancel</Button>
				<Button type="submit">
					{#if $delayed}
						loading...
					{:else}
						Submit
					{/if}
				</Button>
			</Dialog.Footer>
			<!-- end form section -->
		</form>
	</Dialog.Content>
</Dialog.Root>
