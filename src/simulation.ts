import { DraggableState } from "./draggable"

type Margins = { top: number; right: number; bottom: number; left: number }

/** A SimulationConfig holds the physics and animation properties for the card simulation. */
export interface SimulationConfig {
	initialTransform: string
	initialAnimationEasing: string
	initialAnimationDuration: number
	initialAnimationStagger: number
	initialMargin: Margins
	pageMargin: number
	movementClamp: number
	friction: number
	accelerationFriction: number
	minVelocity: number
	pushFactor: number
}

/** A Simulation keeps track of and drives animations for the draggable cards. */
export class Simulation {
	readonly config: Readonly<SimulationConfig>

	private draggables = new Map<string, DraggableState>()
	#started = false
	#lastT = 0
	#z = 0

	constructor(config: SimulationConfig) {
		this.config = Object.freeze({ ...config })

		this.add = this.add.bind(this)
		this.remove = this.remove.bind(this)
		this.init = this.init.bind(this)
		this.animate = this.animate.bind(this)
		this.zIndex = this.zIndex.bind(this)
		this.onDeviceMotion = this.onDeviceMotion.bind(this)

		window.addEventListener("devicemotion", this.onDeviceMotion, true)
	}

	init() {
		if (this.#started) return
		this.#started = true
		requestAnimationFrame(this.animate)
	}

	/** New creates a new DraggableState for the given HTMLElement bound to this Simulation. */
	new(el: HTMLElement) {
		const id = "draggable-" + Math.random().toString(36).substring(2, 9)
		return new DraggableState(this, id, el)
	}

	/** Add adds a DraggableState to the simulation. */
	add(d: DraggableState) {
		this.draggables.set(d.id, d)
	}

	/** Remove removes a DraggableState from the simulation. */
	remove(d: DraggableState) {
		this.draggables.delete(d.id)
	}

	/**
	 * ZIndex returns an incrementing z-index for the draggable elements, to ensure cards that are
	 * interacted with are displayed on top.
	 */
	zIndex(): number {
		this.#z++
		return this.#z
	}

	#lastMotionEvent: DOMHighResTimeStamp | null = null
	onDeviceMotion(ev: DeviceMotionEvent) {
		if (
			ev.acceleration &&
			magnitude(ev.acceleration.x ?? 0, ev.acceleration.y ?? 0, ev.acceleration.z ?? 0) > 20
		) {
			const now = performance.now()
			if (this.#lastMotionEvent != null && now - this.#lastMotionEvent < 30) {
				return
			}

			this.#lastMotionEvent = now

			this.flingAll()
		}
	}

	flingAll() {
		for (const d of this.draggables.values()) {
			d.fling()
		}
	}

	private animate(t: number) {
		for (const d of this.draggables.values()) {
			const initialTransform = d.transform()

			const pageRegion = this.region(d, this.config.pageMargin)

			if (d.active) {
				d.position = this.clamp2d(d.requestedPosition, pageRegion)
			} else {
				d.acceleration.x *= this.config.accelerationFriction
				d.acceleration.y *= this.config.accelerationFriction
				d.velocity.x += d.acceleration.x * (t - this.#lastT)
				d.velocity.y += d.acceleration.y * (t - this.#lastT)

				d.velocity.x *= this.config.friction
				d.velocity.y *= this.config.friction
				if (Math.abs(d.velocity.x) < this.config.minVelocity) d.velocity.x = 0
				if (Math.abs(d.velocity.y) < this.config.minVelocity) d.velocity.y = 0
				d.position.x += d.velocity.x * (t - this.#lastT)
				d.position.y += d.velocity.y * (t - this.#lastT)

				d.position = this.push2d(d.position, pageRegion)

				d.angularAcceleration *= this.config.accelerationFriction
				d.angularVelocity += d.angularAcceleration * (t - this.#lastT)
				d.angularVelocity *= this.config.friction
				d.rotation += d.angularVelocity * (t - this.#lastT)
				d.rotation %= 360

				if (d.requestedRotation !== null) {
					d.requestedRotation %= 360
					if (Math.abs(d.requestedRotation - d.rotation) > 180) {
						d.rotation = this.push(d.rotation, d.requestedRotation - 360)
					} else {
						d.rotation = this.push(d.rotation, d.requestedRotation)
					}
					if (Math.abs(d.requestedRotation - d.rotation) < 0.1) {
						d.requestedRotation = null
					}
				}
			}

			const newTransform = d.transform()
			if (newTransform != initialTransform) {
				d.el.style.transform = newTransform
			}
		}

		this.#lastT = t
		requestAnimationFrame(this.animate)
	}

	/** Clamp soft-clamps a value between a minimum and maximum. */
	clamp(value: number, min: number, max: number): number {
		if (value < min) {
			return (
				min -
				Math.tanh((min - value) / this.config.movementClamp) * this.config.movementClamp
			)
		}
		if (value > max) {
			return (
				max +
				Math.tanh((value - max) / this.config.movementClamp) * this.config.movementClamp
			)
		}
		return value
	}

	/** Clamp2d soft-clamps a 2D point to a given region. */
	clamp2d(value: DOMPoint, region: DOMRect): DOMPoint {
		return new DOMPoint(
			this.clamp(value.x, region.left, region.right),
			this.clamp(value.y, region.top, region.bottom),
		)
	}

	/** Push applies a "push" effect to a value, moving it closer to a target. */
	push(value: number, target: number): number {
		if (value < target) {
			return value + (target - value) * this.config.pushFactor
		}
		if (value > target) {
			return value - (value - target) * this.config.pushFactor
		}
		return value
	}

	/** Push1d applies a "push" effect to a value, moving it closer to a target range. */
	push1d(value: number, min: number, max: number): number {
		if (value < min) {
			return value + (min - value) * this.config.pushFactor
		}
		if (value > max) {
			return value - (value - max) * this.config.pushFactor
		}
		return value
	}

	/** Push2d applies a "push" effect to a 2D point, moving it closer to a target region. */
	push2d(value: DOMPoint, region: DOMRect): DOMPoint {
		return new DOMPoint(
			this.push1d(value.x, region.left, region.right),
			this.push1d(value.y, region.top, region.bottom),
		)
	}

	/** Region returns the draggable region for a given draggable element. */
	region(d: DraggableState, margin: number | Margins) {
		if (typeof margin === "number") {
			margin = { top: margin, right: margin, bottom: margin, left: margin }
		}
		return new DOMRect(
			margin.left,
			margin.top,
			window.innerWidth - d.el.offsetWidth - margin.left - margin.right,
			window.innerHeight - d.el.offsetHeight - margin.top - margin.bottom,
		)
	}
}

/** Magnitude calculates the magnitude of a 3D vector. */
function magnitude(x: number, y: number, z: number): number {
	return Math.sqrt(x * x + y * y + z * z)
}
