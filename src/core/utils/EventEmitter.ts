type Callback = (...args: any[]) => any
type Subscription = {
	off: () => void
}

export default class EventEmitter {
	protected map = new Map<string, Callback[]>()

	on(eventName: string, callback: Callback): Subscription {
		if (!this.map.has(eventName)) this.map.set(eventName, [])
		const arr = this.map.get(eventName)
		arr?.push(callback)

		return { off: () => arr?.splice(arr.indexOf(callback), 1) }
	}

	protected emit(eventName: string, args: any[] = []): any[] {
		const handlers = this.map.get(eventName)

		if (handlers !== undefined && handlers !== null)
			return handlers.map(handler => handler(...args))
		else return []
	}
}
