// 学习如何加载静态图片资源
import picUrl from '@assets/images/preview.jpg'
import picUrl2 from '@assets/images/images.png'

const img1 = document.createElement('img')
const img2 = document.createElement('img')

img1.src = picUrl
img2.src = picUrl2
document.body.appendChild(img1)
document.body.appendChild(img2)
