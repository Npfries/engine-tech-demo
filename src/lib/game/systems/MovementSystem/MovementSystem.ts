import { System } from '../../../ecs/System/AbstractSystem';
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

            const distance = 0.15 * deltaTime;

            if (inputComponent.moveRight) positionComponent.x += distance;
            if (inputComponent.moveLeft) positionComponent.x -= distance;
            if (inputComponent.moveUp) positionComponent.y -= distance;
            if (inputComponent.moveDown) positionComponent.y += distance;
        });
    }
}
