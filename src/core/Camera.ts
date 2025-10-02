import { PerspectiveCamera, Scene } from 'three'
import Experience from './Experience'
import type Sizes from './utils/Sizes'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

export default class Camera {
	private experience: Experience
	private sizes: Sizes
	public instance: PerspectiveCamera
	private scene: Scene
	private canvas: HTMLCanvasElement
	public controls: OrbitControls

	constructor() {
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas

		this.instance = this.setInstance()
		this.controls = this.setOrbitControls()
		this.scene.add(this.instance)
	}

	private setInstance() {
		const camera = new PerspectiveCamera(
			35,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		)

		camera.position.set(0, 0, 5)

		return camera
	}

	private setOrbitControls() {
		const controls = new OrbitControls(this.instance, this.canvas)
		controls.enableDamping = true
		controls.enableZoom = false
		controls.autoRotate = true
		controls.autoRotateSpeed = 0.2
		// controls.minPolarAngle = 0
		// controls.maxPolarAngle = Math.PI

		return controls
	}

	public update() {
		this.controls.update()
	}

	public resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
	}
}
