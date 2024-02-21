<template>
  <!-- 修改密码 -->
  <el-dialog
    v-model="state.changePasswordDialog"
    title="修改密码"
    width="400px"
    @close="close(formRef)"
  >
    <el-form
      ref="formRef"
      :label-position="labelPosition"
      :model="passwordData"
      :rules="rules"
      class="login-form"
    >
      <el-form-item label="请输入您的旧密码" prop="oldPassword">
        <el-input v-model="passwordData.oldPassword" placeholder="请输入您的旧密码" show-password />
      </el-form-item>
      <el-form-item label="请输入您的新密码" prop="newPassword">
        <el-input v-model="passwordData.newPassword" placeholder="请输入您的新密码" show-password />
      </el-form-item>
    </el-form>
    <!-- 底部内容 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close(formRef)">取消</el-button>
        <el-button :loading="state.confirmLoading" type="primary" @click="confirm(formRef)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { changePassword } from '@/api/userInfo.js'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type { FormProps } from 'element-plus'
import { getItem } from '@/utils/storage'

const formRef = ref<FormInstance>()
const labelPosition = ref<FormProps['labelPosition']>('top')

interface PasswordData {
  oldPassword: string
  newPassword: string
}

// 表单对象
const passwordData = reactive<PasswordData>({
  oldPassword: '',
  newPassword: ''
})
// 表单规则
const rules = reactive<FormRules<PasswordData>>({
  oldPassword: [{ required: true, message: '请输入您的旧密码', trigger: 'blur' }],
  newPassword: [{ required: true, message: '请输入您的新密码', trigger: 'blur' }]
})
// 控制弹窗 默认关闭
const state = reactive({
  changePasswordDialog: false,
  confirmLoading: false
})

// 打开修改密码的弹窗
const open = () => {
  state.changePasswordDialog = true
}
// 修改密码 id 跟 两个 password
const confirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  try {
    await formEl.validate()
    state.confirmLoading = true
    const { message } = await changePassword(
      getItem('id'),
      passwordData.oldPassword,
      passwordData.newPassword
    )
    ElMessage.success(message)
    close(formRef.value)
  } catch (e: any) {
    console.log(e, 'confirm')
    e.message && ElMessage.error(e.message)
  } finally {
    state.confirmLoading = false
  }
}
// 关闭dialog
const close = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  state.changePasswordDialog = false
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped></style>
