import type { Component } from '../Component/AbstractComponent';
import type { Entity } from '../Entity/AbstractEntity';
import type { App } from '../App/App';
import type { uid } from '../Types';

/**
 * All systems extend `System`. Systems should contain all of the logic, but no state.
 */
abstract class System {
	protected ecs: App;

	//old
	protected entityQuery = new Map<string, typeof Component[]>();
	protected entities: { [key: string]: Map<uid, Entity> } = {};

	//new
	protected componentQuery: typeof Component[] = [];
	protected components = new Map<typeof Component, Map<uid, Component>>();

	public prepare(ecs: App) {
		this.ecs = ecs;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars

		//old
		this.entityQuery.forEach((_, key) => {
			this.entities[key] = new Map();
		});

		//new
		this.componentQuery.forEach((component) => {
			this.components.set(component, new Map());
		});
	}

	public indexEntity(entity: Entity) {
		//old
		this.entityQuery.forEach((components, key) => {
			let entityHasRequiredComponents = true;
			components.forEach((requiredComponent) => {
				if (!entity.getComponent(requiredComponent)) {
					entityHasRequiredComponents = false;
				}
			});
			if (entityHasRequiredComponents) {
				// if (!this.collection[key]) this.collection[key] = new Map();
				this.entities[key].set(entity.id, entity);
			}
		});

		//new
		this.componentQuery.forEach((component) => {
			const entityComponent = entity.getComponent(component);
			if (entityComponent) {
				this.components.get(component).set(entity.id, entityComponent);
			}
		});
	}

	public unindexEntity(entity: Entity) {
		Object.keys(this.entities).forEach((key) => {
			this.entities[key].delete(entity.id);
		});
	}

	public get<T extends Component>(component: typeof Component) {
		return this.components.get(component) as Map<uid, T>;
	}

	abstract update(delta: number);
}

export { System };
