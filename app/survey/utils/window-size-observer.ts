import debounce from 'lodash/debounce'

import { IResizeCallBack } from '@/types'

const getDevice = function(boundary: number) {
  return window.innerWidth >= boundary ? 'desktop' : 'mobile'
}

export default (callback: IResizeCallBack, boundary: number) => {
  let device = getDevice(boundary)
  callback(device) // first time

  const resizeLinstener = () => {
    const deviceCurrent = getDevice(boundary)

    if (deviceCurrent !== device) {
      device = deviceCurrent
      callback(getDevice(boundary))
    }
  }

  window.addEventListener('resize', debounce(resizeLinstener, 400))
}
