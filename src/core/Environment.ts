import { DirectionalLight, Scene } from 'three'
import Experience from './Experience'

export default class Environment {
	private experience: Experience
	public scene: Scene

	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		const sun = new DirectionalLight(0xffffff, 4)
		sun.position.set(3, 2, -1.25)
		sun.castShadow = true
		sun.shadow.mapSize.set(1024, 1024)
		sun.shadow.normalBias = 0.05
		sun.shadow.camera.far = 15
		this.scene.add(sun)
	}
}
