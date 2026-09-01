import "./entry-common"
import persist from "@alpinejs/persist"
import Alpine from "alpinejs"

import { Simulation } from "./simulation"
import type { AlpineThis } from "./types"

interface Card {
	id: string
	title: string
	name: string
	date: string
	url: string
	icons: string[]
	class: string
	accent: string
	html: string
}

interface Link {
	icon: string
	url: string
	alt: string
}

const links: Link[] = [
	{
		icon: "carbon:logo-github",
		url: "https://github.com/calico32",
		alt: "GitHub",
	},
	{
		icon: "carbon:logo-linkedin",
		url: "https://linkedin.com/in/caleb-chan-ma",
		alt: "LinkedIn",
	},
	{
		icon: "carbon:logo-keybase",
		url: "https://keybase.io/calico32",
		alt: "Keybase",
	},
	{
		icon: "carbon:at",
		url: "mailto:cchan@hey.com",
		alt: "Email",
	},
	// {
	// 	icon: "carbon:blog",
	// 	url: "https://blog.calebc.co",
	// 	alt: "Blog",
	// },
	{
		icon: "carbon:document",
		url: "/resume.pdf",
		alt: "Resume",
	},
]

// Compiled by the markdown plugin in vite.config.ts.
const projectFiles = import.meta.glob("./projects/*.md", {
	eager: true,
}) as Record<string, { frontmatter: Omit<Card, "id" | "html">; html: string }>

const cards: Card[] = Object.entries(projectFiles).map(([path, mod]) => ({
	id: path.replace("./projects/", "").replace(/\.md$/, ""),
	...mod.frontmatter,
	html: mod.html,
}))

shuffle(cards)

const isLarge = window.matchMedia(`(width >= 48rem)`).matches

const sim = new Simulation({
	initialTransform: `translate(40vw, 100vh) rotate(0deg)`,
	initialAnimationEasing: "ease-out",
	initialAnimationDuration: 500,
	initialAnimationStagger: 30,
	initialMargin: isLarge
		? { left: 50, bottom: 50, right: 50, top: 200 }
		: { left: 20, bottom: 20, right: 20, top: 100 },
	pageMargin: isLarge ? 25 : 0,
	movementClamp: isLarge ? 150 : 75,
	friction: 0.8,
	accelerationFriction: 0.6,
	minVelocity: 0.001,
	pushFactor: 0.2,
})

Alpine.data("main", () => ({
	links,
	cards,
	overlayOpen: false,
	/** Card shown in the overlay; kept during the exit animation so the content doesn't vanish. */
	overlayCard: null as Card | null,
	overlayTilt: "",

	init() {
		window.addEventListener("popstate", () => this.syncOverlay())
		window.addEventListener("keydown", (ev) => {
			if (ev.key === "Escape" && this.overlayOpen) this.closeOverlay()
		})
		this.syncOverlay()
	},

	/** SyncOverlay opens or closes the overlay to match the current URL. */
	syncOverlay() {
		const card = cards.find((c) => c.id === decodeURIComponent(location.pathname.slice(1)))
		if (card) this.showCard(card)
		else this.hideCard()
	},

	openOverlay(card: Card) {
		history.pushState({ overlay: true }, "", `/${card.id}`)
		this.showCard(card)
	},

	closeOverlay() {
		if (history.state?.overlay) {
			history.back() // popstate hides the card
		} else {
			// deep link: don't back() out of the site
			history.replaceState(null, "", "/")
			this.hideCard()
		}
	},

	showCard(card: Card) {
		this.overlayCard = card
		this.overlayTilt = `--tilt: ${randomFloat(1.5, 2.5) * (Math.random() < 0.5 ? -1 : 1)}deg; --shift: ${randomFloat(-16, 16)}px`
		this.overlayOpen = true
		document.title = `calebc.co — ${card.name}`
	},

	hideCard() {
		this.overlayOpen = false
		document.title = "calebc.co"
	},
}))

Alpine.data("draggable", function (this: AlpineThis<unknown>, index: number) {
	const d = sim.new(this.$el)
	return {
		state: d,
		init() {
			sim.init()
			d.init(index + 5)
		},
		destroy() {
			d.destroy()
		},
	}
})

Alpine.plugin(persist)
Alpine.start()

function randomFloat(min: number, max: number): number {
	return Math.random() * (max - min) + min
}

/** Shuffle shuffles an array in place. */
function shuffle<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}
