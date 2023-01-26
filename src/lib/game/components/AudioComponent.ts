import { Component } from '../../ecs/Component/AbstractComponent';

export class AudioComponent extends Component {
    playing = false;
    src: string;
}
