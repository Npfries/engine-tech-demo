import { System } from '../../../ecs/System/AbstractSystem';
import { DevToolsComponent } from '../../components/DevToolsComponent';
import { PositionComponent } from '../../components/PositionComponent';
import { RenderableComponent } from '../../components/RenderableComponent';
import { PlayerEntity } from '../../entities/PlayerEntity';

export class DevToolsSystem extends System {
    constructor() {
        super();
        this.entityQuery.set('entities', [DevToolsComponent]);
    }
    update() {
        this.entities.entities.forEach((entity) => {
            const devToolsComponent = entity.getComponent<DevToolsComponent>(DevToolsComponent);

            if (devToolsComponent.shouldAddNPC) {
                devToolsComponent.shouldAddNPC = false;

                const playerPosition = entity.getComponent<PositionComponent>(PositionComponent);

                const npc = new PlayerEntity();
                const position = npc.getComponent<PositionComponent>(PositionComponent);
                position.x = playerPosition.x;
                position.y = playerPosition.y;
                const renderableComponent = npc.getComponent<RenderableComponent>(RenderableComponent);
                renderableComponent.data = 'human.json';
                renderableComponent.idleAnimation = 'idle';

                this.ecs.addEntity(npc);
            }
        });
    }
}
