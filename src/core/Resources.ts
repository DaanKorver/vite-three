import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import type { Source } from './Sources'
import sources from './Sources'
import EventEmitter from './utils/EventEmitter'
import { TextureLoader } from 'three'

interface LoadedSource<T> extends Source {
	data: T
}

export default class Resources extends EventEmitter {
	private sources: Source[] = sources
	public items: { [key: string]: LoadedSource<any> } = {}
	public loaded: number = 0
	public loaders: { [key: string]: GLTFLoader | TextureLoader } = {}
	public total: number = this.sources.length
	public progress: number = 0

	constructor() {
		super()
		this.items = {}
		this.loaded = 0

		this.loaders = this.setLoaders()
		this.load()
		if (sources.length === 0) {
			this.emit('loaded')
		}
	}

	private setLoaders() {
		const loaders = {
			gltfLoader: new GLTFLoader(),
			textureLoader: new TextureLoader(),
		}
		return loaders
	}

	load() {
		for (const source of this.sources) {
			if (source.type === 'gltf') {
				if (this.items[source.name]) {
					this.sourceLoaded(this.items[source.name])
					continue
				}
				this.items[source.name] = { ...source, data: null }
				this.loaders.gltfLoader.load(source.path as string, file => {
					this.sourceLoaded({ ...source, data: file })
				})
			} else if (source.type === 'texture') {
				console.log(this.items)

				if (this.items[source.name]) {
					this.sourceLoaded(this.items[source.name])
					continue
				}
				this.items[source.name] = { ...source, data: null }
				this.loaders.textureLoader.load(source.path as string, file => {
					this.sourceLoaded({ ...source, data: file })
				})
			}
		}
	}

	sourceLoaded(source: LoadedSource<any>) {
		this.items[source.name] = source
		this.loaded++
		this.progress = (this.loaded / this.total) * 100
		console.log(this.progress)

		if (this.loaded === this.total) {
			this.emit('loaded')
		}
	}
}
