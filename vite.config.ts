import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

const PORT = 3000
const PREVIEW_PORT = PORT

export default defineConfig({
	plugins: [glsl({ minify: true })],

	server: {
		port: PORT,
	},

	preview: {
		port: PREVIEW_PORT,
	},
})
