import { BoxGeometry, Mesh, MeshNormalMaterial, type Scene } from 'three'
import Experience from './Experience'
import type Resources from './Resources'

export default class World {
	private experience: Experience
	public scene: Scene
	public resources: Resources

	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		this.resources.on('loaded', () => {
			// Setup

			const geometry = new BoxGeometry(1, 1, 1)
			const material = new MeshNormalMaterial()
			const mesh = new Mesh(geometry, material)
			this.scene.add(mesh)
		})
	}
}
