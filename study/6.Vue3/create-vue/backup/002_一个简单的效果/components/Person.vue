<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Person',
  data() {
    return {
      name: '张三' as string,
      age: 18 as number,
      tel: '13888888888' as string
    }
  },
  methods: {
    // 修改姓名
    changeName(): void {
      this.name = 'zhang-san'
    },
    // 修改年龄
    changeAge(): void {
      this.age += 1
    },
    // 展示联系方式
    showTel(): void {
      alert(this.tel)
    }
  }
}
</script>

<style scoped>
.person {
  background-color: skyblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}
</style>
