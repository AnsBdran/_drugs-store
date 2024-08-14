<script lang="ts">
	import { onMount } from 'svelte';
	import { dimensions } from '$lib/stores/dimensions.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { URL_PAGE_NUMBER_REGEX } from '$lib/constants.js';
	import { debounce } from 'lodash-es';
	import { cn } from '$lib/utils';

	let inputValue = $page.url.searchParams.get('q') || '';
	let className = '';
	export { className as class };
	onMount(() => {
		const cleanup = dimensions.initialize();
		return cleanup;
	});

	const handleSearch = debounce((e: Event) => {
		if (!inputValue) {
			const newUrl = new URL($page.url);
			newUrl.searchParams.delete('q');
			goto(newUrl.toString());
			// (e.target as HTMLInputElement).closest('form')?.requestSubmit();
		} else {
			const newUrl = new URL($page.url);
			newUrl.pathname = newUrl.pathname.replace(URL_PAGE_NUMBER_REGEX, '/1');
			newUrl.searchParams.set('q', inputValue);
			goto(newUrl.toString());
			// (e.target as HTMLInputElement).closest('form')?.requestSubmit();
		}
	}, 300);
</script>

<form
	data-sveltekit-replacestate={true}
	class={cn(className)}
	data-sveltekit-keepfocus={true}
	method="get"
>
	<Input name="q" placeholder="Search" on:input={handleSearch} bind:value={inputValue} />
</form>
