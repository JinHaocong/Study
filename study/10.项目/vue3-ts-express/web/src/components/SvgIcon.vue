<template>
  <svg :style="{ width: size + 'px', height: size + 'px' }" aria-hidden="true" class="svg-icon">
    <use :fill="color" :xlink:href="symbolId" />
  </svg>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: [Number, String],
    default: 16
  }
})
console.log(props)
const symbolId = computed(() => `#icon-${props.iconName}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  fill: currentColor;
  vertical-align: middle;
}
</style>
