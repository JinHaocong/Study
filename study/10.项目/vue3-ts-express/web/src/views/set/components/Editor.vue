<template>
  <el-dialog
    v-model="state.dialogFormVisible"
    :title="title"
    destroy-on-close
    width="50%"
    @close="cancel"
  >
    <div style="border: 1px solid #ccc">
      <!-- wangEditor结构 -->
      <Toolbar
        :defaultConfig="toolbarConfig"
        :editor="editorRef"
        :mode="state.mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        v-model="state.valueHtml"
        :defaultConfig="editorConfig"
        :mode="state.mode"
        style="height: 500px; overflow-y: hidden"
        @onCreated="handleCreated"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button :loading="state.confirmLoading" type="primary" @click="confirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, reactive, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import bus from '@/utils/mitt.js'
import { ElMessage } from 'element-plus'
import { changeCompanyIntroduce, getCompanyIntroduce } from '@/api/setting'
import plugins from './plugins'

type CompanySetName =
  | ''
  | 'companyIntroduction'
  | 'companyStructure'
  | 'companyStrategy'
  | 'companyLeader'

interface State {
  dialogFormVisible: boolean
  valueHtml: string | null
  mode: 'default' | 'simple'
  title: string
  currentSetName: CompanySetName
  confirmLoading: boolean
}

// 组件创建时，监听事件
onMounted(() => {
  bus.on('editorTitle', editorTitle)
})

// 组件销毁时，也及时销毁编辑器，并清除事件监听
onBeforeUnmount(() => {
  bus.off('editorTitle')

  const editor = editorRef.value
  if (editor) editor.destroy()
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const title = ref()
const emit = defineEmits(['refresh'])
const state = reactive<State>({
  dialogFormVisible: false,
  valueHtml: '',
  mode: 'default',
  title: '',
  currentSetName: '',
  confirmLoading: false
})

const toolbarConfig = {
  excludeKeys: plugins
}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      //上传图片配置
      server: `${import.meta.env.VITE_API_BASEURL}/set/uploadCompanyPicture`, //上传接口地址
      fieldName: 'file', //上传文件名
      methods: 'post',
      metaWithUrl: true, // 参数拼接到 url 上
      // 单个文件上传成功之后
      // onSuccess(file, res) {
      // },
      // 自定义插入图片
      customInsert(res: any, insertFn: any) {
        insertFn(res.url)
      }
    }
  }
}

// 记录 editor 实例，重要！
const handleCreated = (editor: any) => {
  editorRef.value = editor
}

// 获取信息给富文本赋值
const editorTitle = async (id: string) => {
  const titleMappings: Record<string, string> = {
    companyIntroduction: '编辑公司介绍',
    companyStructure: '编辑公司架构',
    companyStrategy: '编辑公司战略',
    companyLeader: '编辑公司高层'
  }

  const endpointMappings: Record<string, CompanySetName> = {
    companyIntroduction: 'companyIntroduction',
    companyStructure: 'companyStructure',
    companyStrategy: 'companyStrategy',
    companyLeader: 'companyLeader'
  }

  const titleKey = id as keyof typeof titleMappings
  const endpointKey = id as keyof typeof endpointMappings
  state.currentSetName = endpointMappings[endpointKey]

  if (titleMappings[titleKey] && endpointMappings[endpointKey]) {
    title.value = titleMappings[titleKey]
    const { data } = await getCompanyIntroduce(endpointMappings[endpointKey])
    state.valueHtml = data[0].set_text
  }
}

// 点击确认 修改文案
const confirm = async () => {
  try {
    state.confirmLoading = true
    const res = await changeCompanyIntroduce({ [state.currentSetName]: state.valueHtml })
    ElMessage.success(res.message)
    cancel()
  } catch (e: any) {
    e.message && ElMessage.error(e.message)
    console.log(e, 'confirm')
  } finally {
    state.confirmLoading = false
  }
}

// 取消删除
const cancel = () => {
  state.dialogFormVisible = false
  state.valueHtml = ''
  state.currentSetName = ''
  emit('refresh')
}

// 暴露 打开编辑器
const open = () => {
  state.dialogFormVisible = true
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped></style>
