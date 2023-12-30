import Card from '@/app/components/Card'
import GooseCode from '@/app/components/GooseCode'
import IconBar from '@/app/components/IconBar'
import ScrollIndicator from '@/app/components/ScrollIndicator'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-screen-xl space-y-8 p-8 max-xs:p-6">
        <div className="relative -mt-8 flex min-h-svh flex-col items-center justify-center">
          <Card
            align="center"
            isStatic
            className="mb-16 flex !max-w-[calc(min(80vw,340px))] flex-col items-center max-xs:px-6 max-xs:py-4 sm:block sm:!max-w-[600px]"
          >
            <Image
              src="https://avatars.githubusercontent.com/u/55799457"
              alt=""
              className="float-right mb-8 ml-2 w-28 rounded-full border-2 border-zinc-600 max-xs:mb-4 sm:mb-0 sm:w-32"
              width={200}
              height={200}
            />
            <h1 className="mb-2 w-full text-xs font-bold uppercase tracking-widest max-xs:mb-0">
              welcome
            </h1>
            <p className="text-autoscale-lg mb-6 mt-2 max-xs:mb-4 max-xs:leading-6 sm:mb-2">
              Hi 👋! I'm Caleb, a full-stack developer, designer, and student. Thanks for stopping
              by!
            </p>
            <div className="flex items-center gap-4 text-zinc-600">
              <IconBar
                email="mailto:me@calebc.co"
                github="https://github.com/calico32"
                keybase="https://keybase.io/calico32"
                linkedin="https://linkedin.com/in/caleb-chan-nj"
              />
              <span className="ml-1">•</span>
              <span>
                sign the{' '}
                <Link href="/guestbook" className="underline">
                  guestbook
                </Link>
              </span>
            </div>
          </Card>

          <ScrollIndicator />
        </div>

        <Card align="left" className="mt-8">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-widest">about me</h2>
          <p className="text-autoscale mt-2">I'm a high school senior in northern NJ.</p>
          <p className="text-autoscale mt-2">
            I love to build anything and everything, from{' '}
            <a href="https://github.com/calico32/hilltop" className="underline">
              interactive websites
            </a>{' '}
            to{' '}
            <a href="https://github.com/calico32/battleship" className="underline">
              terminal games
            </a>{' '}
            and{' '}
            <a href="https://github.com/gamer-gang/gamerbot" className="underline">
              Discord bots
            </a>
            .
          </p>
          <p className="text-autoscale mt-2">
            I'm currently working on a few projects, including{' '}
            <a href="#goose" className="underline">
              goose
            </a>
            , my own programming language;{' '}
            <a href="#uctutors" className="underline">
              UCTutors
            </a>
            , a tutor-matching service for my district; and{' '}
            <a href="https://github.com/calico32" className="underline">
              a few more
            </a>
            .
          </p>
        </Card>

        <Card id="goose" align="right" className="mt-8 flex !max-w-none flex-col gap-8 lg:flex-row">
          <GooseCode />
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest">spotlight: goose</h2>
            <p className="text-autoscale">
              I created goose as a way to learn more about programming languages and compilers. The
              language itself is dynamically typed and supports proeedural and level 1 OOP code, and
              its design takes from many languages, including JavaScript, Lua, Dart, and Go. It can
              be interpreted or compiled to machine code using LLVM. It's still a work in progress,
              but you can check it out on{' '}
              <a href="https://example.com" className="underline">
                GitHub
              </a>
              .
            </p>
            <IconBar go />
          </div>
        </Card>

        <Card id="uctutors" className="mt-8 flex flex-col gap-8 lg:flex-row">
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest">spotlight: uctutors</h2>
            <p className="text-autoscale">
              UCTutors connects students with other students who can help them with their
              schoolwork. The Android app uses modern Android technologies like Jetpack Compose and
              Kotlin, and communicates securely and robustly with the TypeScript backend via gRPC.
            </p>
            <IconBar ts bun kotlin android gradle androidstudio googleplay material />
          </div>
        </Card>

        <Card align="center" className="mt-8 !max-w-[60ch] space-y-2">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-widest">skills</h2>
          <p className="text-autoscale">
            I have experience with a variety of languages and frameworks. I'm most comfortable with
            the Node.js ecosystem, but I'm also familiar with Go, Java/Kotlin, and Dart, among
            others.
          </p>
          <h3 className="!mt-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            languages
          </h3>
          <IconBar html css ts js go csharp fsharp lua python dart kotlin rust java />
          <h3 className="!mt-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            web technologies
          </h3>
          <IconBar node bun react solid next tailwind prisma headlessui />
          <h3 className="!mt-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            editors &amp; tools
          </h3>
          <IconBar
            vscode
            intellij
            rider
            androidstudio
            git
            docker
            npm
            gradle
            figma
            inkscape
            linux
            arch
            nginx
            letsencrypt
          />
          <h3 className="!mt-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            platforms &amp; databases
          </h3>
          <IconBar github openai cloudflare vercel sentry postgres redis sqlite />
        </Card>

        <Card align="right" className="mt-8">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-widest">contact me</h2>
          <p className="text-autoscale mt-2">
            Feel free to shoot me an email at{' '}
            <a href="mailto:me@calebc.co" className="underline">
              me@calebc.co
            </a>
            . I'm also on{' '}
            <a href="https://github.com/calico32" className="underline">
              GitHub
            </a>
            ,{' '}
            <a href="https://keybase.io/calico32" className="underline">
              Keybase
            </a>
            , and{' '}
            <a href="https://linkedin.com/in/caleb-chan-nj" className="underline">
              LinkedIn
            </a>
            .
          </p>
          <p className="text-autoscale mt-2">
            While you're here, you can also{' '}
            <Link href="/guestbook" className="underline">
              sign my guestbook
            </Link>
            !
          </p>
        </Card>
      </main>
    </>
  )
}
