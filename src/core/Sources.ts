export type Source = {
	name: string
	type: 'texture' | 'gltf' | 'hdr'
	path: string | string[]
}

const sources: Source[] = [
	{
		name: 'pupilTexture',
		type: 'texture',
		path: ['/textures/pupil.jpg'],
	},
]

export default sources
