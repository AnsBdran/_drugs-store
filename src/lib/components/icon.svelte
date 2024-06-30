<script lang="ts">
    import Icon from "@iconify/svelte/dist/Icon.svelte";

    export let icon: string;
    export let width = 24
</script>

<Icon {icon} {width} {...$$restProps}/>
