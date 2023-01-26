<script lang="ts">
  import { onMount } from 'svelte';
  import { App } from './ecs/App/App';
  import { InputComponent } from './game/components/InputComponent';
  import { PositionComponent } from './game/components/PositionComponent';
  import { PlayerEntity } from './game/entities/PlayerEntity';
  import { MovementSystem } from './game/systems/RenderSystem/MovementSystem';
  import { RenderSystem } from './game/systems/RenderSystem/RenderSystem';
  import { GameLoop } from './utils/GameLoop';
  
  let framerate: number;

  onMount(() => {
    const GameApp = new App([RenderSystem, MovementSystem]);
    const player = new PlayerEntity()
    const position = player.getComponent<PositionComponent>(PositionComponent)
    position.x = 10
    position.y = 10
    const input = player.getComponent<InputComponent>(InputComponent)
    
    window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

function onKeyDown(event) {
  var keyCode = event.keyCode;
  switch (keyCode) {
    case 68: //d
      input.moveRight = true;
      break;
    case 83: //s
      input.moveDown = true;
      break;
    case 65: //a
      input.moveLeft = true;
      break;
    case 87: //w
      input.moveUp = true;
      break;
  }
}

function onKeyUp(event) {
  var keyCode = event.keyCode;

  switch (keyCode) {
    case 68: //d
      input.moveRight = false;
      break;
    case 83: //s
      input.moveDown = false;
      break;
    case 65: //a
      input.moveLeft = false;
      break;
    case 87: //w
      input.moveUp = false;
      break;
  }
}

    GameApp.addEntity(player)

    const Loop = new GameLoop(2);

    Loop.onTick((deltaTime) => {
      framerate = Math.ceil(((1000 / deltaTime) + framerate) / 2) || 0
      GameApp.update(deltaTime)
    })

    Loop.start()
  })
</script>

<div>
  Framerate: {framerate}
  <div id='GameCanvas'>

  </div>
  W A S D
</div>

