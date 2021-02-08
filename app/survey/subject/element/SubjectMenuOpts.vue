<template lang="pug">
.optionBlock(v-bind="$attrs")
  template(v-if="device === 'desktop'")
    .webSelect(
        ref="selectText"
        @click="toggleSelect")
      .selectText {{ currentText }}
      img(
        :class="isSelectOpen ? 'rotate': ''"
        src="@/assets/img/arrow-up.svg"
        ult="arrow-up")
      Teleport(to="body")
        ul.selectDropdown(
          v-show="isSelectOpen"
          v-perfect-scroll
          :style="dropdownStyle")
          li(
            v-for="(opt, key) in opts"
            :key="`opt-${key + 1}`"
            @click="handleSelect(opt.id)"
          ) {{ opt.item }}
  template(v-else)
    select.menu(
      v-model="selected"
      @change="onChnage")
      option(value="0" disabled selected hidden) 尚未选择
      option(
        v-for="(opt, key) in opts"
        :key="`opt-${key + 1}`"
        :value="opt.id")
        | {{ opt.item }}

</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { device } from '../../utils/window-size-observer'
import { useStore } from 'vuex'

import { Option, SubjectConfig, DropdwonStyle, SubjectAnswer } from '@/types'

export default defineComponent({
  name: 'SubjectMenuOpts',
  props: {
    qid: {
      type: Number,
      default: 0
    },
    opts: {
      type: Object as PropType<Option[]>,
      default: []
    },
    config: Object as PropType<SubjectConfig>
  },
  setup(_props, { emit }) {
    const selected = ref(0)
    const selectText = ref<HTMLElement>()
    const isSelectOpen = ref(false)
    const dropdownStyle = ref<DropdwonStyle>()

    const store = useStore()
    const ans = store.state.survey.surveyAns[_props.qid]
    if (ans) {
      if (ans.select) {
        selected.value = ans.select[0]
      }
    }

    onMounted(() => {
      window.addEventListener('wheel', setDropdownStyle)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('wheel', setDropdownStyle)
    })

    const currentText = computed(() => {
      const opt = _props.opts.find(opt => opt.id === selected.value)
      return opt ? opt.item : '尚未选择'
    })

    const toggleSelect = (): void => {
      isSelectOpen.value = !isSelectOpen.value
      if (!isSelectOpen.value) return
      setDropdownStyle()
    }

    const setDropdownStyle = (): void => {
      const rect = selectText.value?.getBoundingClientRect()
      if (rect) {
        const {
          top,
          left,
          width,
          height
        } = rect
        dropdownStyle.value = {
          width: `${width}px`,
          top: `${top + height}px`,
          left: `${left}px`
        }
      }
    }

    const handleSelect = (id: number): void => {
      selected.value = id
      isSelectOpen.value = false
      onChnage()
    }

    const onChnage = (): void => {
      const payload: SubjectAnswer = {
        select: [selected.value]
      }
      emit('updateSelect', payload)
    }

    return {
      device,
      selected,
      selectText,
      currentText,
      isSelectOpen,
      dropdownStyle,
      toggleSelect,
      handleSelect,
      onChnage
    }
  }
})
</script>

<style lang="stylus" scoped>
.optionBlock
  display flex
  align-items center
  justify-content flex-start
  flex-wrap wrap
  width 100%

  .webSelect
    display flex
    align-items center
    justify-content space-between
    min-width 250px
    border 1px solid #1a6a58
    border-radius 4px
    padding: 0 0.5rem
    user-select none
    cursor pointer
    .selectText
      color: #093f33
    img
      filter: invert(29%) sepia(74%) saturate(396%) hue-rotate(116deg) brightness(98%) contrast(93%)
      margin: unset
      max-width unset
      transform rotate(180deg)
      transition transform 0.2s ease
      &.rotate
        transform rotate(0deg)

  .menu
    width 150px
    border-radius 4px

ul.selectDropdown
  position fixed
  background-color #fff
  border 1px solid #1a6a58
  max-height 300px
  border-top unset
  border-bottom-right-radius: 4px
  border-bottom-left-radius: 4px
  z-index 999
  li
    padding 0.5rem
    color: #093f33
    font-weight: 700;
    transition all 0.2s ease
    cursor pointer
    &:hover
      background-color #1a6a58
      color: #fff
</style>
