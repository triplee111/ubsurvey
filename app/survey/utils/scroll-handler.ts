const useScrollHandler = () => {
  const ps = document.querySelector('.scrollContainer') as HTMLElement
  const psRect = ps.getBoundingClientRect()

  const scrollTo = (qid: string) => {
    const subject = document.querySelector(`#question-${qid}`) as HTMLElement
    const subjectRect = subject.getBoundingClientRect()
    const diffTop = subjectRect.top - psRect.top
    if(diffTop >= 0) {
      ps.scrollTop = diffTop
    }
  }
  return {
    scrollTo
  }
}

export default useScrollHandler
