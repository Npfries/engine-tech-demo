import type { Entity } from '../Entity/AbstractEntity';
import type { System } from '../System/AbstractSystem';


class App {
	private _systems: Map<typeof System, System>;

	constructor(systems: typeof System[]) {
		this._systems = new Map();
		systems.forEach((s) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const system = new (s as any)();
			system.prepare(this);
			this._systems.set(s, system);
		});
	}

	public addEntity(entity: Entity) {
		this._systems.forEach((system) => {
			system.indexEntity(entity);
		});
		return this;
	}

	public removeEntity(entity: Entity) {
		this._systems.forEach((system: System) => {
			system.unindexEntity(entity);
		});
		return this;
	}

	public update(delta: number, systems: System[] = Array.from(this._systems.values())) {
		systems.forEach((system) => {
			system.update(delta);
		});
		return this;
	}
}

export { App };
