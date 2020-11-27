<template lang="pug">
.loading
  .bounce-content
    .msg-text
      slot(name="msg")
        p {{ msg }}
    .double-bounce
    .double-bounce.delay

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BounceLoading',
  setup() {
    return {
      msg: '处理中，请稍候'
    }
  }
})
</script>

<style lang="stylus" scoped>
.loading
  top 0
  width 100%
  height 100%
  position fixed
  background rgba(0, 0, 0, 0.6)
  -webkit-transform translate3d(0%, 0%, 0)
  transform translate3d(0%, 0%, 0)
  z-index 9999

  .bounce-content
    width 500px
    margin 17% auto 0
    text-align center

    @media (max-width: 1000px)
      width 100%
      margin 40% auto 0

    .msg-text
      margin-bottom 30px

      p
        color #eeeeee
        font-size 1.6em

    .double-bounce
      position absolute
      left 49%
      width 40px
      height 40px
      opacity 0.6
      border-radius 50%
      background-color #ccc
      animation sk-bounce 2s infinite ease-in-out
      -webkit-animation sk-bounce 2s infinite ease-in-out

      @media (max-width: 1000px)
        left 45%

      &.delay
        -webkit-animation-delay -1s
        animation-delay -1s

/* key frames */
@keyframes sk-bounce
  0%
  100%
    -webkit-transform scale(0)

  50%
    -webkit-transform scale(1)

@keyframes sk-bounce
  0%
  100%
    transform scale(0)
    -webkit-transform scale(0)

  50%
    transform scale(1)
    -webkit-transform scale(1)
</style>
