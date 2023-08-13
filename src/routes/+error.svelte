<script>
    import { page } from '$app/stores';
</script>

<h1>HERE</h1>
{#if $page?.error?.message}
    <h1>{$page.error.message}</h1>
    
{/if}
