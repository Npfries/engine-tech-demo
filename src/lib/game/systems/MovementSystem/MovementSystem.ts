import { System } from '../../../ecs/System/AbstractSystem';
import { AnimationComponent } from '../../components/AnimationComponent';
import { InputComponent } from '../../components/InputComponent';
import { PositionComponent } from '../../components/PositionComponent';

export class MovementSystem extends System {
    constructor() {
        super();
        this.entityQuery.set('moveables', [InputComponent, PositionComponent]);
    }
    update(deltaTime) {
        this.entities.moveables.forEach((entity) => {
            const inputComponent = entity.getComponent<InputComponent>(InputComponent);
            const positionComponent = entity.getComponent<PositionComponent>(PositionComponent);
            const animationComponent = entity.getComponent<AnimationComponent>(AnimationComponent);

            const distance = 2 * deltaTime;

            if (inputComponent.moveRight) positionComponent.x += distance;
            if (inputComponent.moveLeft) positionComponent.x -= distance;
            if (inputComponent.moveUp) positionComponent.y -= distance;
            if (inputComponent.moveDown) positionComponent.y += distance;

            if (animationComponent) {
                animationComponent.animation = 'idle'; // default animation
                if (inputComponent.moveRight) animationComponent.animation = 'walk_right';
                if (inputComponent.moveLeft) animationComponent.animation = 'walk_left';
                if (inputComponent.moveUp) animationComponent.animation = 'walk_up';
                if (inputComponent.moveDown) animationComponent.animation = 'walk_down';
            }
        });
    }
}
