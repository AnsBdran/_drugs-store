<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn, showToast } from '$lib/utils';
	import Loading from '../loading.svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Alert from '$lib/components/ui/alert';
	import IconamoonInformationSquareDuotone from '~icons/iconamoon/information-square-duotone';

	let className = '';

	// props
	export { className as class };

	// export let form;
	export let data;
	export let action = '';
	export let enctype: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain' =
		'application/x-www-form-urlencoded';
	export let method = 'POST';

	// card title props
	export let title = 'item';
	export let description = 'Complete the form to create a new record in the database.';
	export let btnLabel = 'submit';
	export let schema;
	export let note: string = '';

	const form = superForm(data, {
		validators: zodClient(schema),
		dataType: 'json',
		onUpdate: ({ form }) => {
			showToast(form);
		},
		onError: ({ result }) => {
			console.log(result);
			// $message = result.error.message;
		}
	});
	const { enhance, delayed, form: formData, message, errors } = form;
</script>

<!-- <SuperDebug data={$formData} collapsible={true} label={title} theme="vscode" display={true} /> -->
<Card.Root>
	<Card.Header>
		<Card.Title>{title}</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Header>
	<form {method} {action} {enctype} use:enhance {...$$restProps}>
		<Card.Content>
			{#if note}
				<Alert.Root
					class="mb-3 border border-l-[8px] border-accent-foreground/30 border-l-primary/40 bg-accent shadow-inner "
				>
					<div class="flex items-start gap-2">
						<div>
							<IconamoonInformationSquareDuotone
								class="block flex-1  text-xl text-accent-foreground"
							/>
						</div>
						<div class="pt-0">
							<Alert.Title class="text-lg text-accent-foreground">Heads up!</Alert.Title>
							<Alert.Description class="text-accent-foreground/80">{note}</Alert.Description>
						</div>
					</div>
				</Alert.Root>
			{/if}
			{#if $errors._errors}
				<Alert.Root variant="destructive" class="mb-4">
					<Alert.Title>Warning</Alert.Title>
					<Alert.Description>{$errors._errors}</Alert.Description>
				</Alert.Root>
			{/if}
			<section class={cn('form-wrapper', className)}>
				<slot {form} />
			</section>
		</Card.Content>
		<Card.Footer>
			<Button type="submit" disabled={$delayed}>
				{#if $delayed}
					<Loading class="bg-secondary" />
				{:else}
					{btnLabel}
				{/if}
			</Button>
		</Card.Footer>
	</form>
</Card.Root>
