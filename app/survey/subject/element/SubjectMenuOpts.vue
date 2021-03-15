<template lang="pug">
.optionBlock(v-bind="$attrs")
  .webSelect(
    v-if="device === 'desktop'"
    ref="menuWrapper"
    @click="toggleMenu")
    .selectText {{ currentText }}
    img(
      :class="isMenuOpen ? 'rotate': ''"
      src="@/assets/img/arrow-up.svg"
      ult="arrow-up")

    Teleport(to="body")
      ul.selectDropdown(
        v-show="isMenuOpen"
        v-perfect-scroll
        :style="dropdownStyle")
        li(
          v-for="opt in opts"
          :key="`opt-${opt.id}`"
          @click="handleSelect(opt.id)")
          | {{ opt.item }}

  select.menu(
    v-else
    v-model="answer.select")
    option(
      :value="0"
      disabled
      selected
      hidden) 尚未选择
    option(
      v-for="opt in opts"
      :key="`opt-${opt.id}`"
      :value="opt.id")
      | {{ opt.item }}

</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue'

import { Option, SubjectConfig, DropdwonStyle, SubjectAnswer } from '@/types'
import { device } from '@/survey/utils/window-size-observer'

export default defineComponent({
  name: 'SubjectMenuOpts',
  props: {
    ans: {
      type: Object as PropType<SubjectAnswer>,
      required: true
    },
    opts: {
      type: Object as PropType<Option[]>,
      default: []
    },
    config: Object as PropType<SubjectConfig>
  },
  setup(props, { emit }) {
    const menuWrapper = ref<HTMLElement>(document.createElement('div'))
    const isMenuOpen = ref(false)
    const dropdownStyle = ref<DropdwonStyle>()

    const answer = computed({
      get: () => props.ans,
      set: (value: SubjectAnswer) => {
        emit('update:ans', value)
      }
    })

    const currentText = computed(() => {
      const opt = props.opts.find(
        opt => answer.value && opt.id === answer.value.select
      )
      return opt ? opt.item : '尚未选择'
    })

    onMounted(() => {
      window.addEventListener('wheel', setDropdownStyle)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('wheel', setDropdownStyle)
    })

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value

      if (isMenuOpen.value) {
        setDropdownStyle()
      }
    }

    const setDropdownStyle = () => {
      const rect = menuWrapper.value?.getBoundingClientRect()

      const { top, left, width, height } = rect
      dropdownStyle.value = {
        width: `${width}px`,
        top: `${top + height}px`,
        left: `${left}px`
      }
    }

    const handleSelect = (id: number) => {
      answer.value.select = [id]
      isMenuOpen.value = false
    }

    return {
      device,
      menuWrapper,
      currentText,
      isMenuOpen,
      toggleMenu,
      dropdownStyle,
      handleSelect
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
