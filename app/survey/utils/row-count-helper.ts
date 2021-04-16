import { computed } from 'vue'
import { device } from './window-size-observer'

/**
 *  當欄位設定個數大於選項個數時，為了避免內容大小壓縮，
 *  row count 最大為選項個數。
 */
const useRowCounter = (
  optNums: number,
  column: {
    desktop: number
    mobile: number
  }
) => ({
  rowCount: computed(() =>
    column[device.value] > optNums ? optNums : column[device.value]
  )
})

export default useRowCounter
