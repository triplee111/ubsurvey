export default () => {
  let lengthBetweenDomsTop = 0
  let offset = 0

  const ps = document.querySelector('.scrollContainer') as HTMLElement
  const psRect = ps.getBoundingClientRect()

  const scrollTo = (qid: number) => {
    const target = document.getElementById(`question-${qid}`)

    if (target) {
      const subjectRect = target.getBoundingClientRect()

      lengthBetweenDomsTop = Number(
        Math.round(
          (Math.round(subjectRect.top) - Math.round(psRect.top) - 10) * 100
        ) + 'e-2'
      )

      offset = Number(Math.round((lengthBetweenDomsTop / 30) * 100) + 'e-2')

      if (lengthBetweenDomsTop >= 0) {
        smoothScroll(0)
      }
    }
  }

  const smoothScroll = (distance: number) => {
    ps.scrollTop += offset
    distance += offset

    if (
      distance <= lengthBetweenDomsTop &&
      ps.clientHeight + ps.scrollTop < ps.scrollHeight
    ) {
      window.requestAnimationFrame(() => {
        smoothScroll(distance)
      })
    }
  }

  return {
    scrollTo
  }
}
