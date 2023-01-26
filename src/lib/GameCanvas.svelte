<script lang="ts">
  import { Application, Assets, Sprite } from 'pixi.js';
  import { onMount } from 'svelte';
  import { App } from './ecs/App/App';
  let PixiApp = null;
  let GameApp = new App([])

  onMount(() => {
    PixiApp = new Application()
    
    document.getElementById('GameCanvas').appendChild(PixiApp.view)
  })
</script>

<div id='GameCanvas'>

</div>
