<template>
  <div>
    <FormPomodoro :p_25="p_25_img" :alt_3="p_25_name"/>
  </div>
</template>

<script lang="ts">
import FormPomodoro from '@/components/FormPomodoro.vue'

export default {
  components: {
    FormPomodoro
  },
  data() {
      return {
        p_25_img: ('./img/pomodoro-25min.png'),
        p_25_name: ('Pomodoro_25min')
      };
    }
}
</script>