import A from "./A.module.css"
import ALess from "./index.module.less"

console.log(ALess)

console.log(A,'A.CSS')

const div = document.createElement('div');
document.body.appendChild(div);
div.className = A.footerContent
