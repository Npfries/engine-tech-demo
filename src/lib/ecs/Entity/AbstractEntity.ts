import type { Component } from '../Component/AbstractComponent';
import type { uid } from '../Types';


/**
 * All entities extend `Entity`. Entities have an `id` and define contain `Components`. Entities should contain no state or logic.
 */
abstract class Entity {
	public id: uid;
	private _components: Map<typeof Component, Component>;

	/**
	 *
	 * @param id Optional. Useful for deserialization.
	 */
	constructor(id?: uid) {
		this.id = id ? id : this.uid();
		this._components = new Map();
	}

	public getComponent<T extends Component>(component: typeof Component) {
		return this._components.get(component) as T;
	}

	public addComponent(component: typeof Component, ref: Entity) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this._components.set(component, new (component as any)(ref));
		return this;
	}

	public removeComponent(component: typeof Component) {
		this._components.delete(component);
		return this;
	}

	private uid(a = ''): string {
		return a
			? ((Number(a) ^ (Math.random() * 16)) >> (Number(a) / 4)).toString(16)
			: `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, this.uid);
	}
}

export { Entity };
