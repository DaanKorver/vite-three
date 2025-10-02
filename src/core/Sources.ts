export type Source = {
	name: string
	type: 'texture' | 'gltf' | 'hdr'
	path: string | string[]
}

const sources: Source[] = [
	// {
	// 	name: 'someTexture',
	// 	type: 'texture',
	// 	path: ['/textures/someTexture.jpg'],
	// },
]

export default sources
