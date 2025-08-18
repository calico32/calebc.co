import type { Simulation, SimulationConfig } from './simulation'

export class DraggableState {
  /** random ID for the draggable element */
  readonly id: string
  /** current position, pixels */
  position = new DOMPoint(0, 0)
  /** current velocity, pixels per millisecond */
  velocity = new DOMPoint(0, 0)
  /** current acceleration, pixels per millisecond */
  acceleration = new DOMPoint(0, 0)
  /** current rotation, degrees (0 = no rotation) */
  rotation = 0
  /** current angular velocity, degrees per millisecond */
  angularVelocity = 0
  /** current angular acceleration, degrees per millisecond */
  angularAcceleration = 0
  /** requested position by mouse, pixels, set while active to immediately move
   * to this position */
  requestedPosition = new DOMPoint(0, 0)
  /** requested rotation, degrees (0 = no rotation), set to animate to a
   * specific rotation */
  requestedRotation: number | null = null
  /** whether the element is currently being dragged */
  active = false
  /** DOM element being dragged */
  readonly el: HTMLElement
  /** simulation instance */
  readonly sim: Simulation
  /** simulation configuration */
  readonly config: Readonly<SimulationConfig>

  private mouseStart = new DOMPoint(0, 0)
  private start = new DOMPoint(0, 0)
  private t = 0

  constructor(simulation: Simulation, id: string, el: HTMLElement) {
    this.sim = simulation
    this.config = simulation.config
    this.el = el
    this.id = id

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.onTouchCancel = this.onTouchCancel.bind(this)
    this.onDoubleClick = this.onDoubleClick.bind(this)
  }

  /** init plays an initial animation for the draggable element and adds itself
   * to the simulation after the animation completes. */
  init(index: number) {
    this.el.style.transform = this.config.initialTransform

    const initialRegion = this.sim.region(this, this.config.initialMargin)
    this.position = new DOMPoint(
      random(initialRegion.left, initialRegion.right),
      random(initialRegion.top, initialRegion.bottom)
    )
    this.rotation = random(-20, 20)

    const anim = this.el.animate(
      [
        { transform: this.config.initialTransform },
        { transform: this.transform() },
      ],
      {
        easing: this.config.initialAnimationEasing,
        duration: this.config.initialAnimationDuration,
        delay: index * this.config.initialAnimationStagger,
      }
    )

    anim.onfinish = () => {
      this.sim.add(this)
      this.el.style.transform = this.transform()
    }

    this.el.addEventListener('mousedown', this.onMouseDown)
    this.el.addEventListener('touchstart', this.onTouchStart)
    this.el.addEventListener('dblclick', this.onDoubleClick)
  }

  /** destroy removes the draggable element from the simulation and resets the
   * element's styles. */
  destroy() {
    this.sim.remove(this)
    this.el.style.cursor = 'grab'
    this.el.classList.remove('active')
  }

  /** transform returns the CSS transform string for the draggable element. */
  transform(): string {
    return `translate(${this.position.x}px, ${this.position.y}px) rotate(${this.rotation}deg)`
  }

  /** activate sets the draggable element to active. */
  activate() {
    this.active = true
    this.el.classList.add('active')
  }

  /** deactivate sets the draggable element to inactive. */
  deactivate() {
    this.active = false
    this.el.classList.remove('active')
  }

  /** fling applies a "fling" effect to the draggable element, giving it a
   * random velocity and angular velocity. */
  fling() {
    this.angularAcceleration = randomFloat(-0.2, 0.2)
    this.acceleration = vector(randomFloat(0, 360), 0.7)
  }

  onMouseDown(ev: MouseEvent) {
    if (ev.button == 1) {
      // middle click
      ev.preventDefault()
      this.fling()
    }
    if (ev.button !== 0) return
    ev.preventDefault()
    this.mouseStart = new DOMPoint(ev.clientX, ev.clientY)
    const pos = extractTransformCoordinates(this.el)
    if (!pos) {
      console.error('Failed to extract transform coordinates')
      return
    }
    this.start = pos
    this.requestedPosition = pos
    this.activate()
    this.el.style.cursor = 'grabbing'
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  onMouseMove(ev: MouseEvent) {
    ev.preventDefault()
    let lastRequested = this.requestedPosition
    const dx = ev.clientX - this.mouseStart.x
    const dy = ev.clientY - this.mouseStart.y
    this.requestedPosition = new DOMPoint(this.start.x + dx, this.start.y + dy)
    if (this.t == 0) {
      this.t = performance.now()
    } else {
      const dt = performance.now() - this.t
      this.velocity = new DOMPoint(
        (this.requestedPosition.x - lastRequested.x) / dt,
        (this.requestedPosition.y - lastRequested.y) / dt
      )
      this.t = performance.now()
    }
  }

  onMouseUp(ev: MouseEvent) {
    ev.preventDefault()
    this.el.style.cursor = 'grab'
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    // let { x, y } = extractTransformCoordinates(ctx.$el)
    this.t = 0
    this.deactivate()
  }

  onTouchStart(ev: TouchEvent) {
    // we don't consider touch starts as active because it could just be a click
    this.el.classList.add('active')
    document.addEventListener('touchmove', this.onTouchMove)
    document.addEventListener('touchend', this.onTouchEnd)
  }

  onTouchMove(ev: TouchEvent) {
    ev.preventDefault()
    if (!this.active) {
      // first movement - consider it active now
      this.activate()
      this.el.style.zIndex = this.sim.zIndex().toString()
      const touch = ev.touches[0]
      this.mouseStart = new DOMPoint(touch.clientX, touch.clientY)
      const pos = extractTransformCoordinates(this.el)
      if (!pos) {
        console.error('Failed to extract transform coordinates')
        return
      }
      this.start = pos
      this.requestedPosition = pos
    } else {
      // continue movement
      let lastRequested = this.requestedPosition
      const touch = ev.touches[0]
      const dx = touch.clientX - this.mouseStart.x
      const dy = touch.clientY - this.mouseStart.y
      this.requestedPosition = new DOMPoint(
        this.start.x + dx,
        this.start.y + dy
      )
      if (this.t == 0) {
        this.t = performance.now()
      } else {
        const dt = performance.now() - this.t
        this.velocity = new DOMPoint(
          (this.requestedPosition.x - lastRequested.x) / dt,
          (this.requestedPosition.y - lastRequested.y) / dt
        )
        this.t = performance.now()
      }
    }
  }

  onTouchEnd(ev: TouchEvent) {
    document.removeEventListener('touchmove', this.onTouchMove)
    document.removeEventListener('touchend', this.onTouchEnd)
    this.el.classList.remove('active')

    if (!this.active) {
      // touch started but never moved - consider it a click
      return
    }

    // prevent links from being followed
    if (ev.cancelable) {
      ev.preventDefault()
    }

    this.t = 0
    this.deactivate()
  }

  onTouchCancel(ev: TouchEvent) {
    // TODO: OK to forward to touchend?
    this.onTouchEnd(ev)
  }

  onDoubleClick(ev: MouseEvent) {
    ev.preventDefault()
    this.requestedRotation = 0
  }
}

/**
 * extractTransformCoordinates extracts the 2D transform coordinates from a DOM
 * element. It falls back to parsing the transform string if CSSStyleValue is
 * not supported. If parsing fails as well, it returns null.
 */
function extractTransformCoordinates(el: HTMLElement): DOMPoint | null {
  // TODO: CSSStyleValue.parse is not implemented in Firefox
  if (!('CSSStyleValue' in window)) {
    return parseTransform(el.style.transform)
  }

  const style = window.getComputedStyle(el)
  const transform = CSSStyleValue.parse('transform', style.transform)
  if (!(transform instanceof CSSTransformValue)) {
    throw new Error('Failed to parse transform')
  }
  let x: number | null = null
  let y: number | null = null
  transform.forEach((v, i) => {
    if (v instanceof CSSTranslate) {
      console.log(v.x.toString())
      console.log(v.y.toString())
    }
    if (v instanceof CSSMatrixComponent) {
      x = v.matrix.m41
      y = v.matrix.m42
    }
  })
  if (x == null || y == null) {
    throw new Error('Failed to extract coordinates')
  }
  return new DOMPoint(x, y)
}

/**
 * parseTransform attempts to parse a CSS transform string and extract the 2D
 * translation coordinates, using any of the following formats:
 * - translate(x, y)
 * - translate3d(x, y, z)
 * - translateX(x) translateY(y)
 * - translateY(y) translateX(x)
 *
 * If nothing is matched, it returns null.
 */
function parseTransform(transform: string): DOMPoint | null {
  const regexes = [
    /translate\(([^,]+),\s*([^,]+)\)/,
    /translate3d\(([^,]+),\s*([^,]+),\s*[^,]+\)/,
    /translateX\(([^,]+)\)\s+translateY\(([^,]+)\)/,
    /translateY\(([^,]+)\)\s+translateX\(([^,]+)\)/,
  ]
  for (const regex of regexes) {
    const match = regex.exec(transform)
    if (match) {
      const x = parseFloat(match[1])
      const y = parseFloat(match[2])
      return new DOMPoint(x, y)
    }
  }
  return null
}

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}

function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function vector(direction: number, length: number): DOMPoint {
  const rad = (direction * Math.PI) / 180
  return new DOMPoint(Math.cos(rad) * length, Math.sin(rad) * length)
}
