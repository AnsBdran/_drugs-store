<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';
	import type { Action } from 'svelte/action';
	import Loading from '../loading.svelte';

	let className = '';

	// props
	export { className as class };

	// export let form;
	export let action = '';
	export let enctype: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain' =
		'application/x-www-form-urlencoded';
	export let method = 'POST';
	export let enhance: Action<HTMLFormElement>;

	// card title props
	export let title = 'item';
	export let description = 'Complete the form to create a new record in the database.';
	export let btnLabel = 'submit';

	export let delayed: boolean = false;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{title}</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Header>
	<form {method} {action} {enctype} use:enhance {...$$restProps}>
		<Card.Content>
			<section class={cn('form-wrapper', className)}>
				<slot />
			</section>
		</Card.Content>
		<Card.Footer>
			<Button type="submit" disabled={delayed}>
				{#if delayed}
					<Loading class="bg-secondary" />
				{:else}
					{btnLabel}
				{/if}
			</Button>
		</Card.Footer>
	</form>
</Card.Root>
