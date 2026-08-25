/** Reactive `true` once the window has scrolled past `offset` pixels. */
export function useScrolledPast(offset = 24) {
  const passed = ref(false)

  onMounted(() => {
    const update = () => {
      passed.value = window.scrollY > offset
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    onBeforeUnmount(() => window.removeEventListener('scroll', update))
  })

  return passed
}
