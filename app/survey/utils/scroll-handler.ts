export default (selector: string) => {
  let lengthBetweenDomsTop = 0
  let offset = 0

  const box = document.querySelector(selector) as HTMLElement
  const boxRect = box.getBoundingClientRect()

  const scrollTo = (qid: number) => {
    const target = document.getElementById(`question-${qid}`)

    if (target) {
      const subjectRect = target.getBoundingClientRect()

      lengthBetweenDomsTop = Number(
        Math.round(
          (Math.round(subjectRect.top) - Math.round(boxRect.top) - 10) * 100
        ) + 'e-2'
      )

      offset = Number(Math.round((lengthBetweenDomsTop / 30) * 100) + 'e-2')

      if (lengthBetweenDomsTop >= 0) {
        smoothScroll(0)
      }
    }
  }

  const smoothScroll = (distance: number) => {
    box.scrollTop += offset
    distance += offset

    if (
      distance <= lengthBetweenDomsTop &&
      box.clientHeight + box.scrollTop < box.scrollHeight
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
