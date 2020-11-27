<script>
import { defineComponent } from 'vue'

export default defineComponent({
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  },
  setup(props, { emit }) {
    const updateInput = function(value) {
      value = value
        .toLowerCase()
        .replace(/\s/g, '')
        .replace(/[&\\#,+()@$~%.'":*<>{}!`&^]/g, '')

      return value
    }

    return () => {
      return (
        <input
          v-focus
          {...{
            onInput: $event => {
              const value = updateInput($event.target.value)
              emit('update:modelValue', value)
            },
            onKeyup: $event => {
              if ($event.key === 'Enter' && $event.code === 'Enter') {
                updateInput($event.target.value)
                emit('enter')
              }
            }
          }}
        />
      )
    }
  }
})
</script>
