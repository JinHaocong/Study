<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>{{ username }}</h4>
    <h4>{{ password }}</h4>
    <!-- sign v-model用在html标签上 -->
    <!--    <input v-model="username" type="text" />-->
    <!--    <input :value="username" type="text" @input="handleInput($event)" />-->

    <!--sign v-model用在组件标签上 -->
    <!--sign v-model的底层就是 :modelValue="username" @update:modelValue="setModelValue" -->
    <!--    <Input v-model="username" />-->
    <Input :modelValue="username" @update:modelValue="setModelValue" />

    <!-- sign  修改 modelValue 别名-->
    <Input v-model:name="username" v-model:pwd="password" />
  </div>
</template>

<script lang="ts" name="Father" setup>
import { ref } from 'vue'
import Input from './Input.vue'

// 数据
let username = ref('jhc')
let password = ref('123456')

function setModelValue(value: string) {
  username.value = value
}
</script>

<style scoped>
.father {
  padding: 20px;
  background-color: rgb(165, 164, 164);
  border-radius: 10px;
}
</style>
