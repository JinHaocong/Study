# 2022-8-30

## html的标签类型（head， body，！Doctype） 他们的作用是什么

!DOCTYPE；它是指示web浏览器关于页面使用哪个HTML版本进行编写的指令

head；是所有头部元素的容器，绝大多是头部标签内容不会显示给读者

body；定义文档的主体，包含了文档的所有内容

## h5的新特性

1. **新增选择器**；document.querySelector,document.querySelectorAll           √
2. 拖拽释放API
3. **媒体播放** video audio                                                          √
4. **本地存储**；localstorage，sessionstorage                        √
5. 离线应用
6. 桌面通知
7. **语义化标签** article footer header nav section                  √
8. **增强表单控件** calendar date time emali url search          √
9. **地理位置**Geolocation                                                          
10. 多任务 webwork
11. **全双工通信协议** websocket
12. 历史管理 history
13. **跨域资源共享** CORS                                                             √
14. **画布canvas**                                                                             √

## 伪类和伪元素

伪类；用于已有元素处于某种状态时为其添加对应的样式， :hover :active 等

伪元素；用于创建一些不在DOM属中的元素，并为其添加样式。比如可以使用:before来在一个元素前面添加一些文本，并给这个文本添加样式，虽然能看到，但实际上并不在DOM中。

## html5语义化

语义化标签可以用来更清楚地表达文档结构。

易于用户阅读，在样式丢失的情况下能让页面呈现清晰的结构

有利于seo(搜索引擎优化)，可以根据标签来确定上下文和各个关键字之间的权重

利于开发和后期维护。

