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
    import { RenderableComponent } from './game/components/RenderableComponent';
    import { AnimationSystem } from './game/systems/AnimationSystem/AnimationSystem';
    import { DevToolsComponent } from './game/components/DevToolsComponent';
    import { DevToolsSystem } from './game/systems/DevToolsSystem/DevToolsSystem';

    let framerate: number;
    let keyDownKey: number;
    let gamepadId: string;

    onMount(() => {
        // debug

        window.addEventListener(
            'keydown',
            (event) => {
                keyDownKey = event.keyCode;
            },
            false
        );

        window.addEventListener('gamepadconnected', (e) => {
            gamepadId = e.gamepad.id;
            console.log(
                'Gamepad connected at index %d: %s. %d buttons, %d axes.',
                e.gamepad.index,
                e.gamepad.id,
                e.gamepad.buttons.length,
                e.gamepad.axes.length
            );
        });

        // set up game

        const GameApp = new App([DevToolsSystem, MovementSystem, MusicSystem, RenderSystem, AnimationSystem]);
        GameApp.afterUpdate(() => {
            framerate = Math.round(GameApp.globals.FPS);
        });

        // begin game state setup

        const player = new PlayerEntity();
        const position = player.getComponent<PositionComponent>(PositionComponent);
        position.x = 10;
        position.y = 10;
        const input = player.getComponent<InputComponent>(InputComponent);
        const renderableComponent = player.getComponent<RenderableComponent>(RenderableComponent);
        renderableComponent.data = 'human.json';
        renderableComponent.idleAnimation = 'idle';

        player.addComponent(DevToolsComponent, player);

        const devToolsComponent = player.getComponent<DevToolsComponent>(DevToolsComponent);
        const kbMouseInput = new KeyboardMouseInput(input, devToolsComponent);

        GameApp.addEntity(player);

        const musicBox = new MusicBox();
        musicBox.getComponent<AudioComponent>(AudioComponent).src = music;
        GameApp.addEntity(musicBox);

        // end game state setup

        // const Loop = new GameLoop(16); not in use, switch to internalrenderer lib .ticker
        // Loop.onTick((deltaTime) => {
        //     framerate = Math.ceil((1000 / deltaTime + framerate) / 2) || 0;
        //     GameApp.update(deltaTime);
        // });
        // Loop.start();
    });
</script>

<div>
    Framerate: {framerate} Input: {keyDownKey} Gamepad: {gamepadId}
    <div id="GameCanvas" />
    W A S D
</div>
