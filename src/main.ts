import Experience from './core/Experience'
import './style.css'

const canvas = document.querySelector('canvas.webgl')! as HTMLCanvasElement
const app = new Experience(canvas)
