<script lang="ts">
	import type { Request } from '@prisma/client';

	export let request: Request;
</script>

<p>{request.brandName}</p>
