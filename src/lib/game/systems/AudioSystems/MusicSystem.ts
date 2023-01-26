import { System } from '../../../ecs/System/AbstractSystem';
import { AudioComponent } from '../../components/AudioComponent';
import { Howl } from 'howler';

export class MusicSystem extends System {
    constructor() {
        super();
        this.componentQuery = [AudioComponent];
    }

    update(delta: number) {
        this.components.get(AudioComponent).forEach((component: AudioComponent) => {
            if (!component.playing) {
                const music = new Howl({ src: component.src });
                music.play();
                component.playing = true;
            }
        });
    }
}
