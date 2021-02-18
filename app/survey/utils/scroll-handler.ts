const useScrollHandler = () => {
  const ps = document.querySelector('.scrollContainer') as HTMLElement
  const psRect = ps.getBoundingClientRect()
  let diffTop = 0

  const smoothScroll = () => {
    ps.scrollTop += diffTop / 30
    if (ps.scrollTop <= diffTop) {
      window.requestAnimationFrame(smoothScroll)
    }
  }

  const scrollTo = (qid: string) => {
    const subject = document.querySelector(`#question-${qid}`) as HTMLElement
    const subjectRect = subject.getBoundingClientRect()
    diffTop = subjectRect.top - psRect.top
    if (diffTop >= 0) {
      window.requestAnimationFrame(smoothScroll)
    }
  }
  return {
    scrollTo
  }
}

export default useScrollHandler
