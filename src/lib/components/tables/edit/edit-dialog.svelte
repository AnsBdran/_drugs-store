<script lang="ts" generics="T">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	// import type { Manufacturer, DrugItem, User, Drug, Request } from '@prisma/client';
	import { rowEditStore } from '$lib/stores/row-edit';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
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
		onSubmit: ({ formData }) => {
			console.log('submitted', formData);
		},
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
	const { enhance, delayed, form: formData } = form;
	const setRow = (
		isEditOpen: boolean,
		isDeleteOpen: boolean = false,
		row: any | undefined = undefined
		// row: Manufacturer | DrugItem | User | Drug | Request | undefined = undefined
	) => {
		rowEditStore.set({ data: row, isEditOpen, isDeleteOpen });
	};
	let isOpen = false;
	$: console.log($rowEditStore.isEditOpen);
</script>

<Dialog.Root bind:open={$rowEditStore.isEditOpen}>
	<form method="POST" action="?/edit" use:enhance>
		<Dialog.Content class="flex h-[80vh] flex-col  p-2 sm:p-6">
			<Dialog.Header class="">
				<Dialog.Title>Edit item</Dialog.Title>
				<Dialog.Description>Complete the form to edit the item</Dialog.Description>
			</Dialog.Header>
			<!-- form section -->
			<ScrollArea class="mb-3 pr-2 shadow-inner">
				<SuperDebug data={$formData} />
				<div class="space-y-4 px-1">
					<slot {form} />
				</div>
				<input type="hidden" name="_id" value={$rowEditStore.data?.id} />
				<button type="submit"> submit</button>
			</ScrollArea>
			<Dialog.Footer class="flex-row items-center justify-end gap-2 bg-red-50/20 px-2">
				<Button on:click={() => setRow(false)} type="button" variant="destructive">Cancel</Button>
				<Button type="submit">
					{#if $delayed}
						loading...
					{:else}
						Submit
					{/if}
				</Button>
			</Dialog.Footer>
			<!-- end form section -->
		</Dialog.Content>
	</form>
</Dialog.Root>
