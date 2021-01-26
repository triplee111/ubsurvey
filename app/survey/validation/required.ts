export default (fn: any) => {
  return (...args: any) => {
    console.log(args)

    return fn(...args)
  }
}
