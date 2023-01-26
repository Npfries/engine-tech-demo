import { AnimatedSprite, Assets } from 'pixi.js';
import { System } from '../../../ecs/System/AbstractSystem';
import { AnimationComponent } from '../../components/AnimationComponent';
import { RenderableComponent } from '../../components/RenderableComponent';

export class AnimationSystem extends System {
    constructor() {
        super();
        this.entityQuery.set('entities', [AnimationComponent, RenderableComponent]);
    }
    update() {
        this.entities.entities.forEach((entity) => {
            const animationComponent = entity.getComponent<AnimationComponent>(AnimationComponent);
            const renderableComponent = entity.getComponent<RenderableComponent>(RenderableComponent);
            const desiredAnimation = animationComponent.animation;

            if (renderableComponent._sheet && desiredAnimation !== animationComponent._currentAnimation) {
                renderableComponent.sprite.textures = renderableComponent._sheet.animations[desiredAnimation];

                animationComponent._currentAnimation = desiredAnimation;
                renderableComponent.sprite.animationSpeed = 0.2;
                renderableComponent.sprite.play();
            }
        });
    }
}
