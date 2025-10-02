import { CineonToneMapping, PCFSoftShadowMap, WebGLRenderer } from 'three'
import Experience from './Experience'

export default class Renderer {
	private experience: Experience
	public instance: WebGLRenderer

	constructor() {
		this.experience = new Experience()
		this.instance = this.setInstance()
	}

	private setInstance() {
		const renderer = new WebGLRenderer({
			canvas: this.experience.canvas,
			antialias: true,
		})
		renderer.toneMapping = CineonToneMapping
		renderer.toneMappingExposure = 1.75
		renderer.shadowMap.enabled = true
		renderer.shadowMap.type = PCFSoftShadowMap
		renderer.setClearColor(0x211d20)
		renderer.setSize(this.experience.sizes.width, this.experience.sizes.height)
		renderer.setPixelRatio(this.experience.sizes.pixelRatio)

		return renderer
	}

	public update() {
		this.instance.render(this.experience.scene, this.experience.camera.instance)
	}

	public resize() {
		this.instance.setSize(
			this.experience.sizes.width,
			this.experience.sizes.height
		)
		this.instance.setPixelRatio(this.experience.sizes.pixelRatio)
	}
}
