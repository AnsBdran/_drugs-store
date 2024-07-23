<script lang="ts">
	import { Switch } from '$lib/components/ui/switch';

	export let initialValue: boolean;
	let value = initialValue ?? false;
</script>

<Switch checked={value} disabled />
