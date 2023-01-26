
import { App } from '../App/App';
import { Component } from '../Component/AbstractComponent';
import { Entity } from '../Entity/AbstractEntity';
import type { uid } from '../Types';

import { System } from './AbstractSystem';

class TestComponent extends Component {}

class UnusedComponent extends Component {}

class TestEntity extends Entity {
	constructor(id: uid) {
		super(id);
		this.addComponent(TestComponent, this);
	}
}

const app = new App([]);

it('should index an entity when no query is provided', () => {
	let indexedEntity: Entity = null;

	class TestSystem extends System {
		constructor() {
			super();
			this.query.set('entities', []);
		}
		update() {
			indexedEntity = this.collection.entities.get('664fb-df42-4111-fsd2-sdfw34221');
		}
	}

	const entity = new TestEntity('664fb-df42-4111-fsd2-sdfw34221');
	const system = new TestSystem();
	system.prepare(app);
	system.indexEntity(entity);
	system.update();

	expect(indexedEntity).toBe(entity);
});

it('should index an entity when it contains the queried component', () => {
	let indexedEntity: Entity = null;

	class TestSystem extends System {
		constructor() {
			super();
			this.query.set('entities', [TestComponent]);
		}
		update() {
			indexedEntity = this.collection.entities.get('asd24-df42-4111-fdd5-lkn2334s');
		}
	}

	const entity = new TestEntity('asd24-df42-4111-fdd5-lkn2334s');
	const system = new TestSystem();
	system.prepare(app);
	system.indexEntity(entity);
	system.update();

	expect(indexedEntity).toBe(entity);
});

it('should not index an entity when it does not contain the queried component', () => {
	let indexedEntity: Entity = null;

	class TestSystem extends System {
		constructor() {
			super();
			this.query.set('entities', [UnusedComponent]);
		}
		update() {
			indexedEntity = this.collection.entities.get('asd24-df42-4111-fdd5-lkn2334s');
		}
	}

	const entity = new TestEntity('asd24-df42-4111-fdd5-lkn2334s');
	const system = new TestSystem();
	system.prepare(app);
	system.indexEntity(entity);
	system.update();

	expect(indexedEntity).toBeFalsy();
});
