# 💎Vue-晏清-admin介绍

Vue-晏清-admin是一个基于Vue3全家桶+Ts+Scss+MySQL+Express框架以及echarts、wangEditor等插件的全栈开发后台管理系统，适合有一定Vue基础或者是想入职但没有项目经验的同学学习。

通过该视频的学习，可以了解中小企业是如何从0开发一个企业通用后台管理系统，对前后端数据的交互也会有一个更清晰的认识。



有不少同学问为什么叫晏清？晏清是海晏河清的意思，寓意国泰民安，百姓安居乐业



# 🔥作者介绍

前端小王hs，广东兴宁人，CSDN前端领域90w访问+2w粉丝量博主、阿里云社区博客专家、清华大学出版社签约作家、全栈工程师、网络工程师



博客地址：https://blog.csdn.net/weixin_44001222



# 🔥适宜人群

✨想完整了解前后端数据交互的前端、后端、测试人员

✨对企业如何从0到1搭建信息化系统的感兴趣的同学

✨想独立完成一个完整前后端分离项目的同学

✨想学习前端vue3+Ts技术栈的同学

✨想学习后端Node.js和MySQL数据库的同学

✨想学习如何设计一个具体功能的同学

...



# 🔥视频地址

配套视频地址：https://www.bilibili.com/video/BV1Qu4y1W7rx/



# 👑项目地址

www.cxy001.com



# ⚓接口地址

待完善



# 🛠10-27修复 进度p115

## 全局修复错误接口名称，后端同步修改

```js
// dep_msg.js
// 参数 readid 修改为 readId
// 参数 newid 修改为 newId
// 参数 deleteid 修改为 deleteId

// 基本上 id都改成了Id

// file.js
// 函数名 searchFlie 修改为 searchFile
// 函数名 deleteFlie 修改为 deleteFile
// 接口 url: '/file/deleteFlie' 修改为 url: '/file/deleteFile' 后端同步修改

// log.js
// 函数名 returnOpeartionListData 修改为 returnOperationListData
// 接口 url: '/olog/returnOpeartionListData' 修改为 url: '/olog/returnOperationListData',

// 函数名 clearloginLogList 修改为 clearLoginLogList
// 接口 url: '/llog/clearloginLogList', 修改为 url: '/llog/clearLoginLogList',

// message.js
// 函数名 searchMessageBydepartment 修改为 searchMessageByDepartment
// 接口 url: '/msg/searchMessageBydepartment' 修改为 url: '/msg/searchMessageByDepartment'

// 函数名 fisrtDelete 修改为 firstDelete
// 接口 url: '/msg/fisrtDelete' 修改为 '/msg/firstDelete',

// 系统除文件名涉及到Infor都改成了Info
// userinfor.js
// 函数名 getUserInfor 修改为 getUserInfo

// 全局 product_inwarehouse_number 修改为 product_in_warehouse_number
// 部分 delete 修改为 remove
```

## 修复部分CSS单位冗余情况

0px 修改为 0



## 删除components HelloWorld.vue



## 修复出库列表文件名 out_prodcut_manage_list → out_product_manage_list

menu文件也需要修改菜单路径



## 更换Pinia依赖

```js
"pinia-persistedstate-plugin" 更换成 "pinia-plugin-persistedstate"
```

```
npm uninstall pinia-persistedstate-plugin
npm i pinia-plugin-persistedstate
```

```js
// store/index.js
import {
	createPinia
} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

// message.js 和
// 底部修改为
,{
	persist:true
})

// userinfor.js内 Infor都改为Info 全局同步修改
```





## 修复部分interface 名称和未规范书写单词

```tsx
// common_msg
interface message 修改为 Message

// 函数名 messageInfor 修改为 messageInfo
// 函数名 getdetail 修改为 getDetail
// 参数 readlist 修改为 readList
     
// file/tips.js
// 参数 fileid 修改为 fileId
    
// file/index.vue
// 键 filepageCount 修改为 filePageCount 在其他有换页的文件也有做类似修改
// 函数名 getfiletListlength 修改为 getFileListLength 在其他有换页的文件也有做类似修改 
// 函数名 getfileFirstPageList 修改为 getFileFirstPageList 在其他有换页的文件也有做类似修改
 
// home/index.vue
// 模板commommsg 修改为 common ref="cmsg" 修改为 common_msg
// 函数名 getAllswiper 修改为 returnAllSwiper
// 函数名 getAllCompanyintroduce 修改为 returnAllCompanyIntroduce 同时修改为如下所示：    
	const returnAllCompanyIntroduce = async () => {
		companyIntroduce.value = await getAllCompanyIntroduce()

	}
    
// 函数名 openIntrouce 修改为 openIntroduce
    
// login文件夹下
// repassword 修改为 nextPassword
interface formData 修改为 FormData

// menu
// departmsg 修改为 department_msg

// message/创建_编辑.vue
// 参数 datas 修改为 dataPro
// 参数 alloptions 修改为 allOptions
// 函数名 getdepartment 修改为 returnDepartment
// 其他页面的get***与接口重名的均改为了return开头


```

