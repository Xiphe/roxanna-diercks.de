import { run } from 'remix/component'

const app = run({
  async loadModule(moduleUrl, exportName) {
    const module = await import(moduleUrl)
    const component = module[exportName]
    if (typeof component !== 'function')
      throw new Error(`Unknown client entry: ${moduleUrl}#${exportName}`)
    return component
  },
})

app.addEventListener('error', (event) => console.error(event.error))

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
if (!reducedMotion.matches) {
  const animations = new Map<HTMLElement, Animation>()
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const element = entry.target as HTMLElement
        observer.unobserve(element)
        animations.get(element)?.play()
      }
    },
    { threshold: 0 },
  )
  for (const element of document.querySelectorAll<HTMLElement>(
    '.prose > h1,.prose > h2,.prose > h3,.prose > p,.prose > ul > li,.prose > blockquote,.reveal',
  )) {
    if (element.getBoundingClientRect().top >= innerHeight) {
      // Prepare outside the viewport so entering content never flashes before fading in.
      const animation = element.animate(
        [
          { opacity: 0, transform: 'translateY(25px)' },
          { opacity: 1, transform: 'none' },
        ],
        {
          duration: element.classList.contains('reveal') ? 2000 : 750,
          easing: 'ease-in-out',
          fill: 'both',
        },
      )
      animation.pause()
      animation.currentTime = 0
      animations.set(element, animation)
      void animation.finished.then(
        () => {
          animation.cancel()
          animations.delete(element)
        },
        () => animations.delete(element),
      )
      observer.observe(element)
    }
  }
  reducedMotion.addEventListener('change', (event) => {
    if (!event.matches) return
    observer.disconnect()
    for (const animation of animations.values()) animation.cancel()
    animations.clear()
  })
}
function pauseHeroVideo() {
  for (const video of document.querySelectorAll('video.hero-video'))
    (video as HTMLVideoElement).pause()
}
if (reducedMotion.matches) pauseHeroVideo()
reducedMotion.addEventListener('change', (event) => {
  if (event.matches) pauseHeroVideo()
})

// Motion setup must not wait for interactive islands to download and hydrate.
await app.ready()
