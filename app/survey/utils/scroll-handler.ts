export default () => {
  let lengthBetweenDomsTop = 0
  let distance = 0

  const ps = document.querySelector('.scrollContainer') as HTMLElement
  const psRect = ps.getBoundingClientRect()

  const scrollTo = (qid: number) => {
    const target = document.getElementById(`question-${qid}`)

    if (target) {
      const subjectRect = target.getBoundingClientRect()

      lengthBetweenDomsTop = Number(
        Math.round(((subjectRect.top - psRect.top) / 2) * 100) + 'e-2'
      )

      distance = Number(Math.round((lengthBetweenDomsTop / 30) * 100) + 'e-2')

      if (lengthBetweenDomsTop >= 0) {
        smoothScroll()
      }
    }
  }

  const smoothScroll = () => {
    ps.scrollTop += distance

    if (
      ps.scrollTop <= lengthBetweenDomsTop &&
      ps.clientHeight + ps.scrollTop < ps.scrollHeight
    ) {
      window.requestAnimationFrame(smoothScroll)
    }
  }

  return {
    scrollTo
  }
}
