<script lang="ts">
	import { fromNow } from '$lib/utils';

	export let date: Date;
</script>

<span class="text-nowrap">
	{fromNow(date)}
</span>
