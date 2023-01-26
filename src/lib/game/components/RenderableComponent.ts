import type { Sprite } from 'pixi.js';
import { Component } from '../../ecs/Component/AbstractComponent';

export class RenderableComponent extends Component {
    public height: number;
    public width: number;

    public sprite: Sprite;
}
