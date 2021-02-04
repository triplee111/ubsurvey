import debounce from 'lodash/debounce'
import { ref } from 'vue'

import { IResizeCallBack } from '@/types'

const device = ref('')

export {
  device
}

const getDevice = function(boundary: number) {
  return window.innerWidth >= boundary ? 'desktop' : 'mobile'
}

export default (callback: IResizeCallBack, boundary: number) => {
  device.value = getDevice(boundary)
  callback(device.value) // first time

  const resizeLinstener = () => {
    const deviceCurrent = getDevice(boundary)

    if (deviceCurrent !== device.value) {
      device.value = deviceCurrent
      callback(getDevice(boundary))
    }
  }

  window.addEventListener('resize', debounce(resizeLinstener, 400))
}
