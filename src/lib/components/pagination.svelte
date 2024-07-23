<script lang="ts">
    import * as Pagination from '$lib/components/ui/pagination';
    import {cn} from '$lib/utils';

    let className = '';

    // props
    export let count: number;
    export let perPage: number;
    export let page: number;
    export let link: string;
    export {className as class};
    $: console.log({
        count,
        perPage,
        page
    });
</script>

<Pagination.Root
        {count}
        {perPage}
        let:pages
        let:currentPage
        bind:page
        class={cn('mx-0', className)}
>
    <Pagination.Content>
        <Pagination.Item>
            <Pagination.PrevButton href={`${link}/${Number(page) - 1}`}/>
        </Pagination.Item>
        {#each pages as page (page.key)}
            {#if page.type === 'ellipsis'}
                <Pagination.Item>
                    <Pagination.Ellipsis/>
                </Pagination.Item>
            {:else}
                <Pagination.Item>
                    <a href={`${link}/${page.value}`}>
                        <Pagination.Link {page} isActive={currentPage === page.value}>
                            {page.value}
                        </Pagination.Link>
                    </a>
                </Pagination.Item>
            {/if}
        {/each}
        <Pagination.Item>
            <Pagination.NextButton href={`${link}/${Number(page) + 1}`}/>
        </Pagination.Item>
    </Pagination.Content>
</Pagination.Root>
