/**
 * Progressive scroll-reveal.
 *
 * Server-rendered HTML carries no hidden state — every section ships visible,
 * so the page is complete without JavaScript and safe for crawlers. On mount we
 * add the `.reveal` class only to elements still below the fold, which also
 * avoids the flash you get from hiding content that is already on screen.
 *
 * Opt an element in with `data-reveal` (optionally `data-reveal="150"` for a
 * stagger delay in milliseconds).
 */
export function useScrollReveal() {
  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]')
    ).filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.85)

    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    )

    for (const el of targets) {
      const delay = el.dataset.reveal
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)
      el.classList.add('reveal')
      observer.observe(el)
    }

    onBeforeUnmount(() => observer.disconnect())
  })
}
