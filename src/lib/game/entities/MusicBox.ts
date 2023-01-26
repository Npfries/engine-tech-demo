import { Entity } from '../../ecs/Entity/AbstractEntity';
import { AudioComponent } from '../components/AudioComponent';

export class MusicBox extends Entity {
    constructor() {
        super();
        this.addComponent(AudioComponent, this);
    }
}
