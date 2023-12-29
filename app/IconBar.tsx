import StyledIcon from '@/app/StyledIcon'
import { contrastColors, convertSRGBtoHex, parseHexColor } from '@/app/color'
import { icons } from './icons'

type IconBarProps = {
  -readonly [K in keyof typeof icons]?: boolean | string
} & {
  $all?: boolean
}

for (const key in icons) {
  const originalColor = icons[key as keyof typeof icons][1]
  const newColor = convertSRGBtoHex(
    contrastColors(parseHexColor('#121215'), parseHexColor(originalColor)),
  )
  icons[key as keyof typeof icons][1 as any] = newColor as any
}
export default function IconBar(props: IconBarProps): JSX.Element {
  const enabledIcons = props.$all
    ? (Object.keys(icons).map((icon) => [icon, undefined] as const) as [
        keyof typeof icons,
        string | undefined,
      ][])
    : (Object.entries(props)
        .filter(([, enabled]) => enabled)
        .map(
          ([icon, enabledOrLink]) =>
            [icon, typeof enabledOrLink === 'string' ? enabledOrLink : undefined] as const,
        ) as [keyof typeof icons, string | undefined][])

  return (
    <div className="flex flex-wrap items-center gap-3 text-zinc-500 sm:gap-2">
      {enabledIcons.map(([icon, link], i) => (
        <StyledIcon iconName={icon} link={link} key={i} />
      ))}
    </div>
  )
}
