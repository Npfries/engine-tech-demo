<script lang="ts">
    import GameCanvas from './lib/GameCanvas.svelte';
    let started = false;
</script>

<main>
    {#if started}
        <GameCanvas />
    {:else}
        <button
            on:click={() => {
                started = true;
            }}>Start</button
        >
    {/if}
</main>

<style>
</style>
