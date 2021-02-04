import { computed } from 'vue'
import { device } from './window-size-observer'
import { Obj } from '@/types'

const useRowCounter = (optLength: number, column: Obj) => {
  const rowCount = computed(() => {
    /**
     *  預設 row count 為 2，
     *  當欄位設定個數大於選項個數時，為了避免內容大小壓縮，
     *  row count 最大為選項個數。
     */
    let count = 2
    if (column) {
      const tmp = column[device.value]
      count = tmp > optLength ? optLength : tmp
    }
    return count
  })
  return {
    rowCount
  }
}

export default useRowCounter
