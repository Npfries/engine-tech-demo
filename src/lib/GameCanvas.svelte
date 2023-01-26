<script lang="ts">
    import { onMount } from 'svelte';
    import { App } from './ecs/App/App';
    import { AudioComponent } from './game/components/AudioComponent';
    import { InputComponent } from './game/components/InputComponent';
    import { PositionComponent } from './game/components/PositionComponent';
    import { MusicBox } from './game/entities/MusicBox';
    import { PlayerEntity } from './game/entities/PlayerEntity';
    import { MovementSystem } from './game/systems/MovementSystem/MovementSystem';
    import { RenderSystem } from './game/systems/RenderSystem/RenderSystem';
    import { MusicSystem } from './game/systems/AudioSystems/MusicSystem';
    import { GameLoop } from './utils/GameLoop/GameLoop';
    import { KeyboardMouseInput } from './utils/Input/KeyboardMouseInput';
    import music from '../assets/sounds/music/notification.wav';

    let framerate: number;

    onMount(() => {
        const GameApp = new App([RenderSystem, MovementSystem, MusicSystem]);

        const player = new PlayerEntity();
        const position = player.getComponent<PositionComponent>(PositionComponent);
        position.x = 10;
        position.y = 10;

        const input = player.getComponent<InputComponent>(InputComponent);
        const kbMouseInput = new KeyboardMouseInput(input);

        GameApp.addEntity(player);

        const musicBox = new MusicBox();

        musicBox.getComponent<AudioComponent>(AudioComponent).src = music;

        GameApp.addEntity(musicBox);

        const Loop = new GameLoop(2);

        Loop.onTick((deltaTime) => {
            framerate = Math.ceil((1000 / deltaTime + framerate) / 2) || 0;
            GameApp.update(deltaTime);
        });

        Loop.start();
    });
</script>

<div>
    Framerate: {framerate}
    <div id="GameCanvas" />
    W A S D
</div>
