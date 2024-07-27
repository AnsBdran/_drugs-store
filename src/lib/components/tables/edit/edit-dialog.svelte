<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { DrugItem, Manufacturer, Request } from '@prisma/client';
	import { rowChanges } from '$lib/stores/table.store';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import type { ManufacturerSchema } from '$lib/schemas/manufacturer';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import type { DrugItemSchema } from '$lib/schemas/drug-item';
	import type { RequestEditSchema } from '$lib/schemas/request';

	// props
	export let data: SuperValidated<Infer<ManufacturerSchema | DrugItemSchema | RequestEditSchema>>;
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

	const { enhance, delayed, form: formData } = form;
	const setRow = (
		isEditOpen: boolean,
		isDeleteOpen: boolean = false,
		row: Manufacturer | DrugItem | null = null
	) => {
		rowChanges.set({ data: row, isEditOpen, isDeleteOpen });
	};
</script>

<Dialog.Root bind:open={$rowChanges.isEditOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit item</Dialog.Title>
			<Dialog.Description>Complete the form to edit the item</Dialog.Description>
		</Dialog.Header>
		<form method="POST" action="?/edit" use:enhance enctype="multipart/form-data">
			<!-- form section -->
			<ScrollArea class="mb-3 h-[70vh] shadow-inner">
				<div class="px-2">
					<svelte:component
						this={formComponent}
						{form}
						initialValues={$rowChanges.data}
						info={$$restProps.info}
						drugs={$$restProps.drugs}
						mode="edit"
					/>
				</div>
			</ScrollArea>
			<input type="hidden" name="_id" value={$rowChanges.data?.id} />
			<Dialog.Footer class="flex-row items-center justify-end gap-2 px-2">
				<Button on:click={() => setRow(false)} variant="destructive">Cancel</Button>
				<Button type="submit" class="">
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
