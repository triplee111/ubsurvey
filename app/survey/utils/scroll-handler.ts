const useScrollHandler = () => {
  const scrollTo = (qid: string) => {
    const subject = document.querySelector(`#question-${qid}`) as HTMLElement
    if(subject) {
      subject.scrollIntoView()
    }
  }
  return {
    scrollTo
  }
}

export default useScrollHandler
