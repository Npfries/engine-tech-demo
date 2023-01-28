import type { App } from '../../ecs/App/App';
import type { DevToolsComponent } from '../../game/components/DevToolsComponent';
import type { InputComponent } from '../../game/components/InputComponent';
import { PositionComponent } from '../../game/components/PositionComponent';
import { RenderableComponent } from '../../game/components/RenderableComponent';
import { PlayerEntity } from '../../game/entities/PlayerEntity';

export class KeyboardMouseInput {
    constructor(inputComponent: InputComponent, devToolsComponent: DevToolsComponent) {
        window.addEventListener('keydown', _onKeyDown, false);
        window.addEventListener('keyup', _onKeyUp, false);

        function _onKeyDown(event) {
            var keyCode = event.keyCode;
            switch (keyCode) {
                case 68: //d
                    inputComponent.moveRight = true;
                    break;
                case 83: //s
                    inputComponent.moveDown = true;
                    break;
                case 65: //a
                    inputComponent.moveLeft = true;
                    break;
                case 87: //w
                    inputComponent.moveUp = true;
                    break;
                case 69:
                    devToolsComponent.shouldAddNPC = true;
                    break;
            }
        }

        function _onKeyUp(event) {
            var keyCode = event.keyCode;

            switch (keyCode) {
                case 68: //d
                    inputComponent.moveRight = false;
                    break;
                case 83: //s
                    inputComponent.moveDown = false;
                    break;
                case 65: //a
                    inputComponent.moveLeft = false;
                    break;
                case 87: //w
                    inputComponent.moveUp = false;
                    break;
            }
        }
    }
}
