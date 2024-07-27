<script lang="ts">
	import SmallForm from './small-form.svelte';

	export let form;
</script>

<SmallForm label="drug indication" {form} name="indications" />
<SmallForm label="drug contra-indication" {form} name="contraIndications" />
<SmallForm label="drug active ingredient" {form} name="activeIngredients" />
<SmallForm label="drug form" {form} name="forms" />
<SmallForm label="drug category" {form} name="categories" />
<SmallForm label="drug strength" name="strengths" {form} />
