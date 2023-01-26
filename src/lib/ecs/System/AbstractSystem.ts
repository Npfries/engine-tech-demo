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
	protected query = new Map<string, typeof Component[]>();
	protected collection: { [key: string]: Map<uid, Entity> } = {};

	//new
	protected queryList: typeof Component[] = [];
	protected componentCollection = new Map<typeof Component, Map<uid, Component>>();

	public prepare(ecs: App) {
		this.ecs = ecs;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars

		//old
		this.query.forEach((_, key) => {
			this.collection[key] = new Map();
		});

		//new
		this.queryList.forEach((component) => {
			this.componentCollection.set(component, new Map());
		});
	}

	public indexEntity(entity: Entity) {
		//old
		this.query.forEach((components, key) => {
			let entityHasRequiredComponents = true;
			components.forEach((requiredComponent) => {
				if (!entity.getComponent(requiredComponent)) {
					entityHasRequiredComponents = false;
				}
			});
			if (entityHasRequiredComponents) {
				// if (!this.collection[key]) this.collection[key] = new Map();
				this.collection[key].set(entity.id, entity);
			}
		});

		//new
		this.queryList.forEach((component) => {
			const entityComponent = entity.getComponent(component);
			if (entityComponent) {
				this.componentCollection.get(component).set(entity.id, entityComponent);
			}
		});
	}

	public unindexEntity(entity: Entity) {
		Object.keys(this.collection).forEach((key) => {
			this.collection[key].delete(entity.id);
		});
	}

	public get<T extends Component>(component: typeof Component) {
		return this.componentCollection.get(component) as Map<uid, T>;
	}

	abstract update(delta: number);
}

export { System };
