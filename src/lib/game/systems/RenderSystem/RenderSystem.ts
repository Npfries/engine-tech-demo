import { Application, Sprite, Texture } from 'pixi.js';
import { System } from '../../../ecs/System/AbstractSystem';
import { PositionComponent } from '../../components/PositionComponent';
import { RenderableComponent } from '../../components/RenderableComponent';
import { PlayerEntity } from '../../entities/PlayerEntity';

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
    }

    update() {
        this.entities.renderables.forEach((entity) => {
            const renderableComponent = entity.getComponent<RenderableComponent>(RenderableComponent);
            const positionComponent = entity.getComponent<PositionComponent>(PositionComponent);

            // if sprite does not exist, add it to the stage
            if (!renderableComponent.sprite) {
                renderableComponent.sprite = new Sprite(Texture.WHITE); // replace with real texture
                this._stage.addChild(renderableComponent.sprite);
            }

            // update position of sprite
            renderableComponent.sprite.position.x = positionComponent.x;
            renderableComponent.sprite.position.y = positionComponent.y;
        });
    }
}
