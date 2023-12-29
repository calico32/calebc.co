import SiJava from '@/app/components/SiJava'
import * as Si from '@icons-pack/react-simple-icons'

type IconTriple = [Icon: Si.IconType, color: string, name: string]
export const icons = {
  ts: [Si.SiTypescript, Si.SiTypescriptHex, 'TypeScript'] as IconTriple,
  js: [Si.SiJavascript, Si.SiJavascriptHex, 'JavaScript'] as IconTriple,
  react: [Si.SiReact, Si.SiReactHex, 'React'] as IconTriple,
  next: [Si.SiNextdotjs, Si.SiNextdotjsHex, 'Next.js'] as IconTriple,
  node: [Si.SiNodedotjs, Si.SiNodedotjsHex, 'Node.js'] as IconTriple,
  html: [Si.SiHtml5, Si.SiHtml5Hex, 'HTML'] as IconTriple,
  css: [Si.SiCss3, Si.SiCss3Hex, 'CSS'] as IconTriple,
  tailwind: [Si.SiTailwindcss, Si.SiTailwindcssHex, 'Tailwind CSS'] as IconTriple,
  prisma: [Si.SiPrisma, Si.SiPrismaHex, 'Prisma'] as IconTriple,
  bun: [Si.SiBun, Si.SiBunHex, 'Bun'] as IconTriple,
  webpack: [Si.SiWebpack, Si.SiWebpackHex, 'Webpack'] as IconTriple,
  headlessui: [Si.SiHeadlessui, Si.SiHeadlessuiHex, 'Headless UI'] as IconTriple,
  npm: [Si.SiNpm, Si.SiNpmHex, 'npm'] as IconTriple,
  solid: [Si.SiSolid, Si.SiSolidHex, 'Solid'] as IconTriple,

  kotlin: [Si.SiKotlin, Si.SiKotlinHex, 'Kotlin'] as IconTriple,
  android: [Si.SiAndroid, Si.SiAndroidHex, 'Android'] as IconTriple,
  androidstudio: [Si.SiAndroidstudio, Si.SiAndroidstudioHex, 'Android Studio'] as IconTriple,
  compose: [Si.SiJetpackcompose, Si.SiJetpackcomposeHex, 'Jetpack Compose'] as IconTriple,
  googleplay: [Si.SiGoogleplay, Si.SiGoogleplayHex, 'Google Play'] as IconTriple,
  gradle: [Si.SiGradle, Si.SiGradleHex, 'Gradle'] as IconTriple,
  material: [Si.SiMaterialdesign, Si.SiMaterialdesignHex, 'Material Design'] as IconTriple,

  go: [Si.SiGo, Si.SiGoHex, 'Go'] as IconTriple,
  csharp: [Si.SiCsharp, Si.SiCsharpHex, 'C#'] as IconTriple,
  fsharp: [Si.SiFsharp, Si.SiFsharpHex, 'F#'] as IconTriple,
  dotnet: [Si.SiDotnet, Si.SiDotnetHex, '.NET'] as IconTriple,
  lua: [Si.SiLua, Si.SiLuaHex, 'Lua'] as IconTriple,
  python: [Si.SiPython, Si.SiPythonHex, 'Python'] as IconTriple,
  rust: [Si.SiRust, '#f74c00', 'Rust'] as IconTriple,
  java: [SiJava, '#f8981d', 'Java'] as IconTriple,

  flutter: [Si.SiFlutter, Si.SiFlutterHex, 'Flutter'] as IconTriple,
  dart: [Si.SiDart, Si.SiDartHex, 'Dart'] as IconTriple,

  postgres: [Si.SiPostgresql, Si.SiPostgresqlHex, 'PostgreSQL'] as IconTriple,
  redis: [Si.SiRedis, Si.SiRedisHex, 'Redis'] as IconTriple,
  docker: [Si.SiDocker, Si.SiDockerHex, 'Docker'] as IconTriple,
  sqlite: [Si.SiSqlite, Si.SiSqliteHex, 'SQLite'] as IconTriple,

  figma: [Si.SiFigma, Si.SiFigmaHex, 'Figma'] as IconTriple,
  inkscape: [Si.SiInkscape, Si.SiInkscapeHex, 'Inkscape'] as IconTriple,

  github: [Si.SiGithub, Si.SiGithubHex, 'GitHub'] as IconTriple,
  git: [Si.SiGit, Si.SiGitHex, 'Git'] as IconTriple,
  intellij: [Si.SiIntellijidea, Si.SiIntellijideaHex, 'IntelliJ IDEA'] as IconTriple,
  rider: [Si.SiRider, Si.SiRiderHex, 'JetBrains Rider'] as IconTriple,
  vscode: [Si.SiVisualstudiocode, Si.SiVisualstudiocodeHex, 'Visual Studio Code'] as IconTriple,
  unity: [Si.SiUnity, Si.SiUnityHex, 'Unity'] as IconTriple,
  linux: [Si.SiLinux, Si.SiLinuxHex, 'Linux'] as IconTriple,
  nginx: [Si.SiNginx, Si.SiNginxHex, 'NGINX'] as IconTriple,
  cloudflare: [Si.SiCloudflare, Si.SiCloudflareHex, 'Cloudflare'] as IconTriple,
  vercel: [Si.SiVercel, Si.SiVercelHex, 'Vercel'] as IconTriple,
  arch: [Si.SiArchlinux, Si.SiArchlinuxHex, 'Arch Linux'] as IconTriple,
  awesomewm: [Si.SiAwesomewm, Si.SiAwesomewmHex, 'AwesomeWM'] as IconTriple,
  letsencrypt: [Si.SiLetsencrypt, Si.SiLetsencryptHex, "Let's Encrypt"] as IconTriple,
  openai: [Si.SiOpenai, Si.SiOpenaiHex, 'OpenAI'] as IconTriple,
  sentry: [Si.SiSentry, Si.SiSentryHex, 'Sentry'] as IconTriple,
  swagger: [Si.SiSwagger, Si.SiSwaggerHex, 'Swagger'] as IconTriple,

  adventofcode: [Si.SiAdventofcode, Si.SiAdventofcodeHex, 'Advent of Code'] as IconTriple,
  keybase: [Si.SiKeybase, Si.SiKeybaseHex, 'Keybase'] as IconTriple,
  discord: [Si.SiDiscord, Si.SiDiscordHex, 'Discord'] as IconTriple,
  email: [Si.SiGmail, Si.SiGmailHex, 'Email'] as IconTriple,
  linkedin: [Si.SiLinkedin, Si.SiLinkedinHex, 'LinkedIn'] as IconTriple,
  mastodon: [Si.SiMastodon, Si.SiMastodonHex, 'Mastodon'] as IconTriple,
}