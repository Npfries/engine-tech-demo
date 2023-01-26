
import { Entity } from '../Entity/AbstractEntity';
import { Component } from './AbstractComponent';

it('should contain a reference to its Entity', () => {
	class TestEntity extends Entity {}
	class TestComponent extends Component {}
	const entity = new TestEntity();

	const component = new TestComponent(entity);

	expect(component.entity).toBe(entity);
});
