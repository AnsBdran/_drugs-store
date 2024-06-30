<script>
    import {toggleMode} from "mode-watcher";
    import {Button} from "$lib/components/ui/button";
    import MageSunFill from '~icons/mage/sun-fill';
    import F7MoonZzzFill from '~icons/f7/moon-zzz-fill';
</script>

<Button on:click={toggleMode} variant="outline" size="icon">
    <MageSunFill class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
    <F7MoonZzzFill
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
    <span class="sr-only">Toggle theme</span>
</Button>
<!--    <Icon icon="ph:sun-duotone"-->
<!--          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>-->
<!--    <Icon icon="ph:moon-stars-duotone"-->
<!--          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>-->
