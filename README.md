# Vite + Three.js

To get started clone this repository and install the dependencies

## Setup

```bash
pnpm install
```

To run the development server, run the following command

```bash
pnpm dev
```

To build your vite project, run

```bash
pnpm build
```

To start a preview build

```bash
pnpm preview
```

## Modules

This repo has a few neat pre-written modules to make use of

### Experience

This is the main entry point of the 3D world. Experience is a singleton so after first initialization, it can be called from every class and still has a reference to the first initialized instance. This can be useful for getting fast access to important classes.

For example

```ts
class MyClass {
	private experience: Experience
	private scene: Scene

	constructor() {
		this.experience = new Experience()
		// Accessing the main scene through experience!
		this.scene = experience.scene
	}
}
```

### EventEmitter

This class can be used for emitting and subscribing to events outside of a class. Let's say you have a player class where you want to listen for certain events (e.g. score)

You can do the following

```ts
class Player extends EventEmitter {
	constructor() {
		// ...
	}

	score() {
		this.emit('score')
	}
}

const player = new Player()

player.on('score', () => {
	// This wil run everytime the score event is emitted
	console.log('player scored!')
})

player.score()
```

### Sizes

Sizes takes advantage of the EventEmitter class. This emits the event `resize` when the user resizes their window. Super neat.

```ts
const sizes = new Sizes()

sizes.on('resize', () => {
	console.log(sizes.width, sizes.height, sizes.pixelRatio)
})
```

### Time

Just like the sizes class, Time is the same but it acts and a render loop for you app. Its based of of `requestAnimationFrame` so it runs every frame you can render based on your device.

The time class has some useful properties too

- elapsed {number} - Elasped time from start to now
- delta {number} - A normalized delta time value to use in your render loop. At 60FPS it will be ~1 and at for example 120FPS it will be ~0.5. Very useful to make calculations a bit easier
- deltaTime {number} - The delta time in miliseconds (ms)

### Sources and Resources

Sources is just an array where you can define your resources you need for your app. This can be textures, models or HDR.

The Resources will take care of loading those resources and will emit a event (EventEmitter) called `loaded` once everything is ready

## Why did you make this?

I got tired of setting up Three.JS projects with vite everytime I just wanted to make a little demo. So thats why
