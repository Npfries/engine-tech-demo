import type { Entity } from '../Entity/AbstractEntity';

/**
 * All components extend `Component`. Components should contain all state, but no logic.
 * Entities are made up of components. Systems query entities based on the components they contain.
 */
abstract class Component {
	private _entity: Entity;
	constructor(entity: Entity) {
		this._entity = entity;
	}

	get entity() {
		return this._entity;
	}
}

export { Component };
