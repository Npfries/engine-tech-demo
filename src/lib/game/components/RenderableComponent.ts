import type { AnimatedSprite, Texture } from 'pixi.js';
import { Component } from '../../ecs/Component/AbstractComponent';

export class RenderableComponent extends Component {
    public visible = false;

    public height: number;
    public width: number;

    public data: string;
    public idleAnimation: string;

    public sprite: AnimatedSprite;

    public _sheet: any;
}
