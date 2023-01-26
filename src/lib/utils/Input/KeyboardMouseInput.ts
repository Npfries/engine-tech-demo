import type { InputComponent } from '../../game/components/InputComponent';

export class KeyboardMouseInput {
    constructor(inputComponent: InputComponent) {
        window.addEventListener('keydown', onKeyDown, false);
        window.addEventListener('keyup', onKeyUp, false);

        function onKeyDown(event) {
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
            }
        }

        function onKeyUp(event) {
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
