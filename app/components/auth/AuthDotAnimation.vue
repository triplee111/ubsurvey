<script>
export default {
  props: {
    text: String,
    progress: {
      type: Boolean,
      default: false
    }
  },
  render() {
    if (this.progress) {
      return (
        <div>
          <h5>
            {this.text}
            <span class="dot-animation" />
          </h5>
        </div>
      )
    }

    return false
  }
}
</script>

<style lang="stylus">
/* ** loading animatinos ** */
.dot-animation
  font 140 1.4em / 150% Impact
  text-align center

  &:after
    content ' .'
    animation dots 1s steps(5, end) infinite

  @keyframes dots
    0%
    20%
      color rgba(0, 0, 0, 0)
      text-shadow 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0)

    40%
      color gray
      text-shadow 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0)

    60%
      text-shadow 0.25em 0 0 gray, 0.5em 0 0 rgba(0, 0, 0, 0)

    80%
    100%
      text-shadow 0.25em 0 0 gray, 0.5em 0 0 gray
</style>
