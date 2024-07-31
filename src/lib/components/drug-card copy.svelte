<script lang="ts">
    import {cn} from '$lib/utils';

    let className: string | undefined | null = undefined;
    export let drug;
    export let width: number;
    export let height: number;
    export let aspectRatio: 'portrait' | 'square' = 'square';
    export {className as class};
</script>

<div
        class={cn('space-y-3 overflow-hidden ', className)}
        {...$$restProps}
        style={`width: ${width}px;`}
>
    <div class="overflow-hidden rounded-md" style={`width: ${width}px; height: ${height}px;`}>
        <img
                class={cn(
				'h-full w-full object-cover transition-all hover:scale-105',
				aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
			)}
                src={drug.imageURL}
                alt={drug.drug.brandName ?? 'drug'}
        />
    </div>

    <div class="space-y-1 overflow-hidden text-sm">
        <h3 class="mb-0 truncate text-lg font-medium leading-none">{drug.drug.brandName ?? 'drug'}</h3>
        <div>
            <span>{drug.price.item}</span>
        </div>
        <!-- <p class="truncate text-xs text-muted-foreground">{drug.generic_name}</p> -->
    </div>
</div>
