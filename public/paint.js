/// <reference lib="ScriptHost" />

const strokeWidth = 2
const strokeColor = '#18181b66'
const backgroundColor = '#09090b'
const gridGap = 50

registerPaint(
  'grid',
  class {
    static get contextOptions() {
      return { alpha: true }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {{ width: number, height: number }} size
     * @param {{ get: (prop: string) => any }} props
     */
    paint(ctx, size, props) {
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = strokeWidth
      ctx.beginPath()

      for (let x = 0; x < size.width; x += gridGap) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, size.height)
      }

      for (let y = 0; y < size.height; y += gridGap) {
        ctx.moveTo(0, y)
        ctx.lineTo(size.width, y)
      }

      ctx.stroke()
    }
  },
)

const gradientColors = ['#3f3f4699', '#27272a55']

registerPaint(
  'gradient-grid',
  class {
    static get inputProperties() {
      return ['--screen-height']
    }
    static get contextOptions() {
      return { alpha: true }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {{ width: number, height: number }} size
     * @param {{ get: (prop: string) => any }} props
     */
    paint(ctx, size, props) {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, size.width, size.height)

      // CSS Paint polyfill returns a "123px" string, native returns a { value: number }
      const screenHeightData = props.get('--screen-height')
      const screenHeight = cleanPx(screenHeightData.value ?? screenHeightData)

      const x = size.width / 2
      const y = screenHeight / 2

      const shortEdge = Math.min(size.width, screenHeight)
      const gradientScale = Math.max(0.8, -0.00306748 * shortEdge + 2.78773)
      const gridGap = Math.min(75, Math.max(25, 0.0920245 * shortEdge - 9.6319))

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size.width * gradientScale)
      gradientColors.forEach((color, index) =>
        gradient.addColorStop(index / gradientColors.length, color),
      )
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, size.width, size.height)

      ctx.fillStyle = backgroundColor
      for (let x = 0; x < size.width; x += gridGap + strokeWidth) {
        for (let y = 0; y < size.height; y += gridGap + strokeWidth) {
          ctx.fillRect(x, y, gridGap, gridGap)
        }
      }
    }
  },
)

function cleanPx(value) {
  return parseInt(value.toString().replace('px', ''), 10)
}
