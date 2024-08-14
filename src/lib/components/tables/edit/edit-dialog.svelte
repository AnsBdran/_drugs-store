<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { Manufacturer, DrugItem, User, Drug, Request } from '@prisma/client';

	import { rowChanges } from '$lib/stores/table';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { manufacturerSchema, type ManufacturerSchema } from '$lib/schemas/manufacturer';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import type { DrugItemSchema } from '$lib/schemas/drug-item';
	import type { RequestEditSchema } from '$lib/schemas/request';
	import type { UserEditSchema } from '$lib/schemas/auth';
	import type { DrugSchema } from '$lib/schemas/drug';
	import { zodClient } from 'sveltekit-superforms/adapters';

	// props
	export let schema;
	export let data: SuperValidated<
		Infer<ManufacturerSchema | UserEditSchema | DrugSchema | DrugItemSchema | RequestEditSchema>
	>;
	// export let data;
	export let formComponent;

	const form = superForm(data, {
		dataType: 'json',
		// onError(event) {
		// 	console.log('I don not know', event);
		// },
		// onResult(event) {
		// 	console.log('I don not know', event);
		// },
		// onUpdate(event) {
		// 	console.log('I don not know', event);
		// },
		onSubmit: ({ formData }) => {
			console.log('submitted', formData);
		},
		// onChange: ({ get, paths }) => {
		// 	console.log('something changed', get, paths);
		// },
		validators: zodClient(schema),
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
		row: Manufacturer | DrugItem | User | Drug | Request | null = null
	) => {
		rowChanges.set({ data: row, isEditOpen, isDeleteOpen });
	};

	$: console.log(
		'form updated',
		$rowChanges.data?.name,
		'|||||||||||\\\\\\\\\\|||||||||||',
		$formData.name
	);
</script>

<Dialog.Root bind:open={$rowChanges.isEditOpen}>
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
					<svelte:component
						this={formComponent}
						{form}
						initialValues={$rowChanges.data}
						info={$$restProps.info}
						drugs={$$restProps.drugs}
						manufacturers={$$restProps.manufacturers}
					/>
				</div>
				<input type="hidden" name="_id" value={$rowChanges.data?.id} />
				<button type="submit"> submit</button>
			</ScrollArea>
			<Dialog.Footer class="flex-row items-center justify-end gap-2 bg-red-50/20 px-2">
				<Button on:click={() => setRow(false)} type="button" variant="destructive">Cancel</Button>
				<Button type="submit" class="z-[999999999999999999999999999999999999999]">
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
