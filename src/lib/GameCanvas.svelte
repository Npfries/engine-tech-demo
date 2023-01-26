<script lang="ts">
  import { Application } from 'pixi.js';
  import { onMount } from 'svelte';
  import { App } from './ecs/App/App';
  import { GameLoop } from './utils/GameLoop';
  

  onMount(() => {
    const PixiApp = new Application()

    const GameApp = new App([]);

    const Loop = new GameLoop(1000);

    Loop.onTick((deltaTime) => {
      console.log('tick', deltaTime || '??')
      GameApp.update(deltaTime)
    })

    Loop.start()
    
    // @ts-ignore
    document.getElementById('GameCanvas').appendChild(PixiApp.view)
  })
</script>

<div id='GameCanvas'>

</div>
