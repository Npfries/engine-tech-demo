import { Component } from '../../ecs/Component/AbstractComponent';

export class AnimationComponent extends Component {
    animation: 'idle' | 'walk_down' | 'walk_right' | 'walk_up' | 'walk_left';
    _currentAnimation: string;
}
