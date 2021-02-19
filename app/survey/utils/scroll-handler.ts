let lengthBetweenDomsTop = 0

export default () => {
  const ps = document.querySelector('.scrollContainer') as HTMLElement
  const psRect = ps.getBoundingClientRect()

  const smoothScroll = () => {
    ps.scrollTop += lengthBetweenDomsTop / 30

    if (
      ps.clientHeight + ps.scrollTop < ps.scrollHeight &&
      ps.scrollTop <= lengthBetweenDomsTop
    ) {
      window.requestAnimationFrame(smoothScroll)
    }
  }

  const scrollTo = (qid: number) => {
    const target = document.getElementById(`question-${qid}`)

    if (target) {
      const subjectRect = target.getBoundingClientRect()

      lengthBetweenDomsTop = subjectRect.top - psRect.top

      if (lengthBetweenDomsTop >= 0) {
        smoothScroll()
      }
    }
  }

  return {
    scrollTo
  }
}
