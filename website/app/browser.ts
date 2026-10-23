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
await app.ready()

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const element = entry.target as HTMLElement
        observer.unobserve(element)
        element.animate(
          [
            { opacity: 0, transform: 'translateY(25px)' },
            { opacity: 1, transform: 'none' },
          ],
          {
            duration: element.classList.contains('reveal') ? 2000 : 750,
            delay: 250,
            easing: 'ease-in-out',
            fill: 'backwards',
          },
        )
      }
    },
    { threshold: 0.05 },
  )
  for (const element of document.querySelectorAll<HTMLElement>(
    '.prose > h1,.prose > h2,.prose > h3,.prose > p,.prose > ul > li,.prose > blockquote,.reveal',
  )) {
    if (element.getBoundingClientRect().top >= innerHeight) {
      observer.observe(element)
    }
  }
} else {
  for (const video of document.querySelectorAll('video.hero-video'))
    (video as HTMLVideoElement).pause()
}
