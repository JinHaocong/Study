<template>
  <input v-if="name" :value="name" type="text" @input="updateName($event)" />
  <br />
  <input v-if="pwd" :value="pwd" type="text" @input="updatePwd($event)" />

  <input v-if="modelValue" :value="modelValue" type="text" @input="updateModelValue($event)" />
</template>

<script lang="ts" name="Input" setup>
// sign props
defineProps(['name', 'pwd', 'modelValue'])

// sign emit 事件
const emit = defineEmits(['update:name', 'update:pwd', 'update:modelValue'])

// sign input 事件
function updatePwd(event: Event) {
  emit('update:pwd', (event.target as HTMLInputElement).value)
}

function updateName(event: Event) {
  emit('update:name', (event.target as HTMLInputElement).value)
}

function updateModelValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped>
input {
  border: 2px solid black;
  background-image: linear-gradient(45deg, red, yellow, green);
  height: 30px;
  font-size: 20px;
  color: white;
}
</style>
