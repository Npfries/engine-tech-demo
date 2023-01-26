
import { Component } from '../Component/AbstractComponent';
import { Entity } from './AbstractEntity';

describe('constructor', () => {
	it('should generate an id if one is not passed in', () => {
		class TestEntity extends Entity {}

		const entity = new TestEntity();

		expect(entity.id).toBeDefined();
	});

	it('should have the id that was passed in', () => {
		class TestEntity extends Entity {}

		const entity = new TestEntity('1123f-3222-4111-2333-12345153');

		expect(entity.id).toEqual('1123f-3222-4111-2333-12345153');
	});
});

describe('getCompoenent method', () => {
	it('should return a component', () => {
		class TestComponent extends Component {}
		class TestEntity extends Entity {
			constructor() {
				super();
				this.addComponent(TestComponent, this);
			}
		}

		const entity = new TestEntity();

		const component = entity.getComponent(TestComponent);

		expect(component).toBeInstanceOf(TestComponent);
	});
});
