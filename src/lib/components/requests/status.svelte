<script lang="ts">
	import { Badge } from '../ui/badge';

	export let value;
	let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
	let className = '';

	switch (value) {
		case 'pending':
			variant = 'default';
			break;
		case 'rejected':
			variant = 'destructive';
			break;
		case 'accepted':
			variant = 'default';
			className = 'bg-green-400/20 text-green-500 hover:bg-green-400/30';
			break;
		default:
			variant = 'outline';
			break;
	}
</script>

<Badge {variant} class={className}>{value}</Badge>
