<template lang="pug">
#appNavs
  #header
    .pc
      a.logo(
        target="_blank"
        :href="links.osLink")
        SvgIcon.svg-icon(name="ubLogo")

      section
        a(
          v-for="item in headerLinks"
          target="_blank"
          :href="item.url"
          :title="item.title")

          SvgIcon.svg-icon(:name="item.svg")

    .mobile
      a(
        href="#"
        @click.prevent="showModal('login')")
        span 登入

      a.logo(
        target="_blank"
        href="#")
        SvgIcon.svg-icon(name="ubLogo")

      a.switchBtn(
        href="#"
        @click.prevent="toggleMenu(true)")

        SvgIcon.svg-icon(name="hamburger")

  #mobileNav(
    :class="{ 'open' : isShowSidebar }")

    a.coverlay(
      href="#"
      @click.prevent="toggleMenu(false)")

    a.close(
      href="#"
      @click.prevent="toggleMenu(false)")

      SvgIcon.svg-icon(name="dbArrow")

      span 点击此处缩回选单

    section
      a.logo(target="_blank" href="#")

        SvgIcon.svg-icon(name="ubLogo")

      ul.links
        //- External activity links
        li.actLinks(
          v-for="list in actLinks"
          :key="list.path")
          a(@click="isShowSidebar = false")
            span {{ list.title }}

        //- Fixed links
        li.txt-yellow
          a(v-for="item in headerLinks"
            target="_blank"
            :href="item.url")
            span {{ item.title }}

      .header-loginBtn(
        v-if="!account"
        @click="showModal('login')")
        img(width="125" src="@img/loginBtn.png")

</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useModal } from '@act/slime-modal'

import SvgIcon from '@src/icon/svgIcon' // load svg icon sprite from source

import { ExternalLinks } from '@/types'

export default defineComponent({
  name: 'AppHeader',
  inject: ['links'],
  setup() {
    const store = useStore()
    const modal = useModal()
    const isShowSidebar = ref(false)

    const account = computed(() => store.state.auth.user.account)

    const toggleMenu = (bool: boolean) => {
      isShowSidebar.value = bool
    }

    const { appLink, osLink, csLink, testLink } = inject(
      'links'
    ) as ExternalLinks

    const headerLinks = [
      {
        title: 'APP下载',
        url: appLink,
        svg: 'mobile'
      },
      {
        title: '优博官网',
        url: osLink,
        svg: 'home'
      },
      {
        title: '线上客服',
        url: csLink,
        svg: 'headset'
      },
      {
        title: '备用网址',
        url: testLink,
        svg: 'globe'
      }
    ]

    const actLinks = [
      {
        hook: '1',
        title: '瑞兔闯金关'
      },
      {
        hook: '1',
        title: '抢位赏银花'
      },
      {
        hook: '2',
        title: '传递浓情意'
      },
      {
        hook: '3',
        title: '全民大鸿包'
      }
    ]

    const fixedLinks = [
      {
        title: 'APP下载',
        url: appLink
      },
      {
        title: '优博官网',
        url: osLink
      },
      {
        title: '优博客服',
        url: csLink
      }
    ]

    watch(account, (val: string) => {
      if (val) {
        toggleMenu(false)
      }
    })

    return {
      isShowSidebar,
      headerLinks,
      actLinks,
      fixedLinks,
      toggleMenu,
      account,
      showModal: modal.show
    }
  },
  components: {
    SvgIcon
  }
})
</script>

<style lang="sass" scoped>
$headerBg: #130000 //--【電腦版】header：背景色
$headerBorder: #dccca0 //--【電腦版】header：邊框色
$headerMainColor: #dccca0 //--【電腦版】header：元件主色

$mbMenuBg: #7c3e25 //--【手機版】側選單：選單背色
$mbActBg: #f8e884 //--【手機版】側選單：活動連結區塊背色
$mbBtnBg: #e3c66f //--【手機版】側選單：立即登入按鈕背景色
$mbMainColor: #ffffff //--【手機版】header & 側選單：元件主色

@import '@css/_variable.sass'

svg[class*="icon"]
  width: 1em
  height: 1em
  vertical-align: text-bottom
  display: inline-block
  fill: #f0dcbc
  +pc-width
    width: 1em
    height: 1.2em

#appNavs
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 999

#header
  +setPosAbs(0,0,null,null,20)
  width: 100%
  z-index: 1
  background: $headerBg
  +iphone-width
    border-bottom: 2px solid #e1d192
  .pc
    position: relative
    max-width: 1035px
    // height: 70px
    margin: 0 auto
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    justify-content: space-between
    align-items: center
    align-content: stretch
  .logo
    display: inline-block
    svg
      display: inline-block
      width: 150px
      height: 46.2px
      fill: #e1d192
      margin-top: -10px
      +iphone-width
        width: 30vmin
  .rule
    visibility: hidden
    opacity: 0
  section
    margin: 10px 0px
    a
      position: relative
      font-size: 2em
      width: 45px
      height: 45px
      line-height: 70px
      margin: 0 5px
      display: inline-block
      border-radius: 100%
      transition: all .2s

      &::after
        position: absolute
        content: ''
        display: black
        width: 100%
        height: 100%
        left: 0
        top: 0
        border: 2px solid #e1d192
        border-radius: 100%
      svg
        width: 60%
        height: 60%
        position: absolute
        left: 50%
        top: 50%
        transform: translate(-50%,-50%)
        fill: #e1d192
      &:hover
        background: #e1d192
        &::after
          border: 2px solid #e1d192
        svg
          fill: #000000
  .mobile
    display: none
    +pc-width
      flex-direction: row
      flex-wrap: nowrap
      justify-content: space-between
      align-items: center
      align-content: stretch
      color: #fff
      font-size: 4vmin
      padding: 3vmin 2.5%
      .logo
        svg
          fill: $headerMainColor
      a
        color: #f0dcbc
    .title
      text-align: center
      font-size: 5vmin
      color: #f0dcbc
    .switchBtn
      font-size: 6vmin
      line-height: 6vmin
    svg[class*="svg-icon-1"]
      width: 22rem
      height: 3rem
      fill: #f0dcbc
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
#mobileNav
  position: fixed
  right: -100%
  top: 0
  min-width: 40%
  height: 100vh
  z-index: 1
  transition: all .4s
  color: #f0dcbc
  svg[class*="icon"]
    width: 2rem
    fill: #f8e884
  .coverlay
    display: none
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    background: rgba(0,0,0,.8)
  .close
    position: absolute
    left: -2em
    width: 1em
    top: 5%
    font-size: 4vmin
    color: #f8e884
    svg
      width: 1em
      margin-bottom: .5em
  .logo
    display: block
    padding: 10px 0
    svg
      display: block
      width: 10em
      height: 2em
      line-height: 3em
      margin: 0 auto
      fill: #f8e884
  section
    position: relative
    background: $mbMenuBg
    color: #ffffff
    overflow-y: auto
    height: 100%
    font-size: 4vmin
  .links
    height: calc(100% - 8em)
    overflow-y: auto
    text-align: center
    background-color: $mbMenuBg
    .actLinks
      span
        color: #000
        font-weight: bold
        font-size: 4.5vmin
        letter-spacing: 2px
    img
      +phone-width
        width: 5vmin
        height: 5vmin
    a
      display: block
      padding: 1em
      display: flex
      justify-content: center
      align-content: center
      span
        color: #ffffff
    li:first-child
      font-weight: 700
      background: #c93a3d
      margin: 0 auto
      color: #fff
      svg
        margin: 0 .5em
        fill: #fff
    li
      &.txt-yellow
        margin-top: 2vmin
        a > span
          color: #f8e884
          font-weight: bold
          font-size: 4.5vmin
      &.actLinks
        font-weight: 700
        background: $mbActBg
        border-top: 1px solid #000
        margin: 0 auto
        color: #ffffff
      svg
        margin-right: .5em
  .loginBox
    position: absolute
    left: 0
    width: 100%
    top: 90%
    a
      display: flex
      justify-content: center
      align-items: center
      margin: 0 auto
      width: 34vmin
      height: 9vmin
      color: #ecdcb3
      padding: 0
      border-radius: 4px
      border: 1px solid #ecdcb3
      letter-spacing: 4px
      >*
        display: inline-block
      svg[class*="icon"]
        fill: #ecdcb3
      span
        color: #212121
  &.open
    right: 0
    .coverlay
      display: block

a
  color: inherit

@media screen and (max-width: 1200px)
  #header
    .pc
      max-width: 95%
    .mobile
      display: flex
      color: #f0dcbc
      background: #000

@media screen and (max-width: 1000px)
  #header
    .title
      display: block
    .pc
      display: none
    svg[class*="icon"]
      // fill: #c868ff
@media screen and (max-width: 575px )
  #header
    .mobile
      svg[class*="svg-icon-1"]
        top: 47.5%
</style>
