<template lang="pug">
section
  slot(name="section")

    slot(name="before")

    .questionBlock
      slot(name="question")

    .helperBlock
      slot(name="helper")

    .optionBlock(v-if="$slots.option")
      slot(name="option")

    slot(name="after")

</template>

<style lang="stylus" scoped>
section
  line-height 2

  .questionBlock
    color #424343

  .helperBlock
    color #d43b27
    font-size 0.85rem

  .optionBlock
    display flex
    align-items center
    justify-content flex-start
    flex-wrap wrap
    width 100%
</style>
