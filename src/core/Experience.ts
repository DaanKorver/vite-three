import { Scene } from 'three'
import Sizes from './utils/Sizes'
import Time from './utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import Resources from './Resources'
import World from './World'

let instance: Experience | undefined

export default class Experience {
	public canvas!: HTMLCanvasElement
	public sizes!: Sizes
	public time!: Time
	public scene!: Scene
	public camera!: Camera
	public renderer!: Renderer
	public world!: World
	public resources!: Resources

	constructor(canvas?: HTMLCanvasElement) {
		if (instance) return instance
		if (!canvas) throw new Error('No canvas provided to Experience')
		instance = this

		this.canvas = canvas
		this.sizes = Sizes.getInstance()
		this.time = Time.getInstance()
		this.scene = new Scene()
		this.camera = new Camera()
		this.renderer = new Renderer()
		this.resources = new Resources()
		this.world = new World()

		// Sizes resize event
		this.sizes.on('resize', this.resize.bind(this))

		// Time tick event
		this.time.on('tick', this.update.bind(this))
	}

	private resize() {}

	private update() {
		this.camera.update()
		this.renderer.update()
	}
}
