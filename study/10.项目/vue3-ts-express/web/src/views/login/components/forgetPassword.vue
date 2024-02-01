<template>
  <!-- 忘记密码 -->
  <el-dialog
    v-model="dialogVisible"
    :align-center="true"
    class="myDialog"
    style="min-height: 385px; width: 375px; border-radius: 30px"
    title="忘记密码"
  >
    <el-form
      ref="forgetForm"
      :label-position="labelPosition"
      :model="forgetData"
      :rules="rules"
      class="login-form"
    >
      <el-form-item label="输入您的注册账号" prop="account">
        <el-input v-model="forgetData.account" placeholder="输入您的注册账号" />
      </el-form-item>
      <el-form-item label="输入您的个人邮箱" prop="email">
        <el-input v-model="forgetData.email" placeholder="输入您的个人邮箱" />
      </el-form-item>
      <el-form-item v-if="showPassword" label="输入您的新密码" prop="password">
        <el-input v-model="forgetData.password" placeholder="输入您的新密码" show-password />
      </el-form-item>
      <el-form-item v-if="showPassword" label="再次确认您的新密码" prop="nextPassword">
        <el-input
          v-model="forgetData.nextPassword"
          placeholder="再次确认您的新密码"
          show-password
        />
      </el-form-item>
    </el-form>
    <!-- 底部内容 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel(forgetForm)">取消</el-button>
        <el-button
          v-if="!showPassword"
          :loading="buttonLoading"
          type="primary"
          @click="verifyAccount(forgetForm)"
        >
          下一步
        </el-button>
        <el-button
          v-if="showPassword"
          :loading="buttonLoading"
          type="primary"
          @click="resetPassword(forgetForm)"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { reset, verify, type VerifyData } from '@/api/login.js'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { getItem, setItem } from '@/utils/storage' // 表单对齐方式
// 表单对齐方式
const labelPosition = ref('top')

const buttonLoading = ref(false)

// 自定义验证函数
const validatePassword = (_: any, value: any, callback: any) => {
  if (value !== forgetData.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

// ref
const forgetForm = ref()
const dialogVisible = ref(false)
const showPassword = ref(false)

// 表单对象
const forgetData: VerifyData = reactive({
  account: null,
  email: '',
  password: '',
  nextPassword: ''
})

// 表单规则
const rules = reactive<FormRules<VerifyData>>({
  account: [{ required: true, message: '请输入您的注册账号', trigger: 'blur' }],
  email: [{ required: true, message: '请输入您的注册邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入您想修改的密码', trigger: 'blur' }],
  nextPassword: [
    { required: true, message: '请再次确认您的新密码', trigger: 'blur' },
    {
      validator: validatePassword,
      trigger: 'blur'
    }
  ]
})

// 打开验证邮箱和账号的弹窗
const verifyAccount = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  try {
    await formEl.validate()
    buttonLoading.value = true
    const { message } = await verify(forgetData)
    ElMessage.success(message)
    showPassword.value = true
  } catch (e: any) {
    console.log(e, 'verifyAccount')
    e.message && ElMessage.error(e.message)
  } finally {
    buttonLoading.value = false
  }
}
// 重置密码
const resetPassword = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  try {
    await formEl.validate()
    buttonLoading.value = true
    const {
      data: { id },
      message
    } = await reset(getItem('id'), forgetData.nextPassword)
    ElMessage.success(message)
    setItem('id', id)
  } catch (e: any) {
    console.log(e, 'resetPassword')
    e.message && ElMessage.error(e.message)
  } finally {
    buttonLoading.value = false
  }
}

// 点击取消弹窗
const cancel = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  dialogVisible.value = false
  showPassword.value = false
}

// 打开弹窗
const open = () => {
  dialogVisible.value = true
}

// 对外暴露
defineExpose({
  open
})
</script>

<style lang="scss" scoped></style>
