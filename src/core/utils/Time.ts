import EventEmitter from './EventEmitter'

let instance: Time | undefined

export default class Time extends EventEmitter {
	private start: number
	private current: number
	public elapsed: number = 0
	public delta = 1
	public deltaTime = 16
	private fpms = 60 / 1000

	private constructor() {
		super()

		this.start = Number(document.timeline.currentTime) || 0
		this.current = this.start

		requestAnimationFrame(this.tick.bind(this))
	}

	private tick(timestamp: number) {
		this.deltaTime = timestamp - this.current
		this.current = timestamp
		this.delta = this.deltaTime * this.fpms
		this.elapsed += this.deltaTime

		this.emit('tick')

		window.requestAnimationFrame(this.tick.bind(this))
	}

	static getInstance() {
		if (instance) {
			return instance
		}
		instance = new Time()
		return instance
	}
}
