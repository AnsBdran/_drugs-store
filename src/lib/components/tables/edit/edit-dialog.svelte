<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	// import type { Manufacturer, DrugItem, User, Drug, Request } from '@prisma/client';
	import { rowEditStore } from '$lib/stores/row-edit';
	import SuperDebug, { superForm, type Infer } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';

	// props
	export let schema;
	export let data;
	// export let data: SuperValidated<Infer<T>>;

	const form = superForm(data, {
		dataType: 'json',
		validators: zodClient(schema),
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success(form?.message?.text as string);
				setRow(false);
				invalidateAll();
			}
		}
	});

	// const { editRowStore } = createRowEditStore();
	const { enhance, delayed, form: formData, options } = form;
	const setRow = (
		isEditOpen: boolean,
		isDeleteOpen: boolean = false,
		row: any | undefined = undefined
		// row: Manufacturer | DrugItem | User | Drug | Request | undefined = undefined
	) => {
		rowEditStore.set({ data: row, isEditOpen, isDeleteOpen });
	};
</script>

<Dialog.Root
	bind:open={$rowEditStore.isEditOpen}
	onOutsideClick={() => {
		setRow(false);
	}}
>
	<Dialog.Content class="flex max-h-[80vh] flex-col justify-between  p-2 sm:p-6">
		<Dialog.Header class="">
			<Dialog.Title>Edit item</Dialog.Title>
			<Dialog.Description>Complete the form to edit the item</Dialog.Description>
		</Dialog.Header>
		<form method="POST" action="?/edit" use:enhance enctype="multipart/form-data">
			<ScrollArea type="scroll" class="h-96 py-3 pr-2 shadow-inner">
				<div class="flex-1 space-y-6">
					<slot {form} initialValues={$rowEditStore.data} />
				</div>
			</ScrollArea>
			<Dialog.Footer class="flex-row items-center justify-end gap-2 px-2 py-2">
				<input type="hidden" name="_id" value={$rowEditStore.data?.id} />
				<Button
					on:click={() => {
						setRow(false);
					}}
					type="button"
					variant="destructive">Cancel</Button
				>
				<Button type="submit">
					{#if $delayed}
						loading...
					{:else}
						Submit
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
