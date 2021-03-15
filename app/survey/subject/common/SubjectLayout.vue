<template lang="pug">
section
  slot(name="section")

    slot(name="before")

    .questionBlock(v-if="$slots.question")
      slot(name="question")

    .helperBlock(v-if="$slots.helper")
      slot(name="helper")

    .answerBlock(v-if="$slots.answer")
      slot(name="answer")

    slot(name="after")

</template>

<style lang="stylus">
section
  margin 15px 0
  line-height 2

  &:nth-child(1)
    margin-top 0

  .questionBlock
    color #424343

  .helperBlock
    color #d43b27
    font-size 0.85rem

  .answerBlock
    display flex
    align-items center
    justify-content flex-start
    flex-wrap wrap
    width 100%
</style>
