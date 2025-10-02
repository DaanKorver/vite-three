import EventEmitter from './EventEmitter'

let instance: Sizes | undefined

export default class Sizes extends EventEmitter {
	public width: number
	public height: number
	public pixelRatio: number

	private constructor() {
		super()
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.pixelRatio = Math.min(window.devicePixelRatio, 2)

		window.addEventListener('resize', () => {
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.pixelRatio = Math.min(window.devicePixelRatio, 2)

			this.emit('resize')
		})
	}

	static getInstance() {
		if (instance) {
			return instance
		}
		return new Sizes()
	}
}
