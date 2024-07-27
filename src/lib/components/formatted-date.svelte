<script lang="ts">
	export let date: Date;

	const formatted = new Date(date).toLocaleDateString('en', {
		month: 'numeric',
		year: 'numeric',
		day: '2-digit'
	});
</script>

<span class="text-nowrap">
	{formatted}
</span>
