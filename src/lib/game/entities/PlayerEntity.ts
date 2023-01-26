import { Entity } from '../../ecs/Entity/AbstractEntity';
import { AnimationComponent } from '../components/AnimationComponent';
import { InputComponent } from '../components/InputComponent';
import { PositionComponent } from '../components/PositionComponent';
import { RenderableComponent } from '../components/RenderableComponent';

export class PlayerEntity extends Entity {
    constructor() {
        super();
        this.addComponent(RenderableComponent, this);
        this.addComponent(PositionComponent, this);
        this.addComponent(InputComponent, this);
        this.addComponent(AnimationComponent, this);
    }
}
