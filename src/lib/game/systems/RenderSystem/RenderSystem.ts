import { AnimatedSprite, Application, Assets, SCALE_MODES, Sprite, Spritesheet, Texture } from 'pixi.js';
import { System } from '../../../ecs/System/AbstractSystem';
import { PositionComponent } from '../../components/PositionComponent';
import { RenderableComponent } from '../../components/RenderableComponent';
import humanSpritesheet from '../../../../assets/sprites/mobiles/human/human.png';
import humanSpritesheetData from '../../../../assets/sprites/mobiles/human/human.json';

export class RenderSystem extends System {
    private _stage: Application['stage'];

    constructor() {
        super();

        this.entityQuery.set('renderables', [RenderableComponent, PositionComponent]);
        // setup pixi.js
        const PixiApp = new Application();
        this._stage = PixiApp.stage;
        // @ts-ignore
        document.getElementById('GameCanvas').appendChild(PixiApp.view);
        PixiApp.ticker.add((dt) => {
            this.ecs.globals.FPS = PixiApp.ticker.FPS;
            this.ecs.update(dt);
        });
    }

    update() {
        this.entities.renderables.forEach((entity) => {
            const renderableComponent = entity.getComponent<RenderableComponent>(RenderableComponent);
            const positionComponent = entity.getComponent<PositionComponent>(PositionComponent);

            // if sprite does not exist, add it to the stage
            if (!renderableComponent.visible) {
                renderableComponent.visible = true;
                // renderableComponent.sprite = new Sprite(Texture.WHITE); // replace with real texture
                Assets.load(renderableComponent.data).then((sheet) => {
                    renderableComponent._sheet = sheet;
                    renderableComponent.sprite = new AnimatedSprite(sheet.animations[renderableComponent.idleAnimation]);

                    renderableComponent.sprite.animationSpeed = 0.2;
                    renderableComponent.sprite.play();
                    renderableComponent.sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
                    renderableComponent.sprite.scale.x = 2;
                    renderableComponent.sprite.scale.y = 2;

                    this._stage.addChild(renderableComponent.sprite);
                });
            }

            if (renderableComponent.sprite) {
                // update position of sprite
                renderableComponent.sprite.position.x = positionComponent.x;
                renderableComponent.sprite.position.y = positionComponent.y;
            }
        });
    }
}
