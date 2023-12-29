type SRGB = [number, number, number]
type HSL = [number, number, number]

export function convertSRGBtoHSL(rgb: SRGB): HSL {
  const [r, g, b] = rgb.map((c) => c / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [h, s, l]
}

export function hue2rgb(p: number, q: number, t: number): number {
  let tt = t
  if (tt < 0) tt += 1
  if (tt > 1) tt -= 1
  if (tt < 1 / 6) return p + (q - p) * 6 * tt
  if (tt < 1 / 2) return q
  if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6
  return p
}

export function convertHSLtoSRGB(hsl: HSL): SRGB {
  const [h, s, l] = hsl
  let r = l
  let g = l
  let b = l

  if (s !== 0) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [r * 255, g * 255, b * 255]
}

/**
 * Slowly increase the foreground color's luminance until it has enough contrast with the background color.
 * @param bg Background color, in sRGB
 * @param fg Foreground color, in sRGB
 * @returns New foreground color, in sRGB
 */
export function contrastColors(bg: SRGB, fg: SRGB): SRGB {
  const isGray = fg.every((c) => c - fg[0] < 10)

  if (fg.every((c) => c === 0) || (isGray && fg[0] < 0x76)) {
    return [200, 200, 200]
  }
  const [, , bgL] = convertSRGBtoHSL(bg)
  const [fgH, fgS, fgL] = convertSRGBtoHSL(fg)
  const newFgL = Math.max(fgL, bgL + 0.45)
  if (newFgL === fgL) {
    return fg
  }

  // increase saturation as luminance increases (except for gray colors)
  const newFgS = !isGray ? Math.min(fgS + (newFgL - fgL) / 2, 1) : fgS
  return convertHSLtoSRGB([fgH, newFgS, newFgL])
}

export function parseHexColor(hex: string): SRGB {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)

  if (!match) {
    throw new Error(`Invalid hex color: ${hex}`)
  }

  return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)]
}

export function convertSRGBtoHex(rgb: SRGB): string {
  const r = Math.round(rgb[0]) * 0x10000
  const g = Math.round(rgb[1]) * 0x100
  const b = Math.round(rgb[2])
  if (r < 0 || r > 0xff0000 || g < 0 || g > 0xff00 || b < 0 || b > 0xff) {
    return '#ffffff'
  }
  return `#${(r + g + b).toString(16).padStart(6, '0')}`
}
