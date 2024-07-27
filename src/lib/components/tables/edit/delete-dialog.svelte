<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { rowChanges } from '$lib/stores/table.store';
	import type { DrugItem, Manufacturer } from '@prisma/client';
	import LineMdLoadingAltLoop from '~icons/line-md/loading-alt-loop';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	let isFormLoading = false;

	// props
	const updateRowChanges = (
		isDeleteOpen: boolean,
		isEditOpen: boolean = false,
		data: Manufacturer | DrugItem | null = null
	) => {
		rowChanges.set({ isDeleteOpen, isEditOpen, data });
	};
</script>

<Dialog.Root bind:open={$rowChanges.isDeleteOpen}>
	<Dialog.Content>
		<Dialog.Header>Confirm delete {$rowChanges.data?.name}</Dialog.Header>
		<Dialog.Description>Are you sure, please know that you can't redo this.</Dialog.Description>
		<form
			action="?/delete"
			method="POST"
			use:enhance={({}) => {
				isFormLoading = true;

				return async ({ update, result }) => {
					update();
					isFormLoading = false;
					if (result.type === 'success') {
						toast(`${result?.data?.name ?? 'item'} deleted successfully`);
						// invalidate('data:manufacturer');
						invalidateAll();
					}
					console.log({
						result
					});
					updateRowChanges(false);
				};
			}}
		>
			<input type="hidden" name="_id" value={$rowChanges.data?.id} />
			<Dialog.Footer class="flex-row justify-end gap-3">
				<Button on:click={() => updateRowChanges(false)}>Cancel</Button>
				<Button type="submit" variant="destructive">
					{#if isFormLoading}
						deleting <LineMdLoadingAltLoop />
					{:else}
						Confirm
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
