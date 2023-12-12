module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended'],

  // add your custom rules here
  // it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'accessor-pairs': 2, // 强制 getter 和 setter 在对象中成对出现
    'arrow-spacing': [2, { // 强制箭头函数的箭头前后使用一致的空格
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'], // 禁止或强制在代码块中开括号前和闭括号后有空格
    'brace-style': [2, '1tbs', { // 强制在代码块中使用一致的大括号风格
      'allowSingleLine': true
    }],
    'camelcase': [0, { // 强制使用骆驼拼写法命名约定
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'], // 要求或禁止末尾逗号
    'comma-spacing': [2, { // 强制在逗号前后使用一致的空格
      'before': false,
      'after': true
    }],
    'object-property-newline': 1, // 强制将对象的属性放在不同的行上
    'comma-style': [2, 'last'], // 强制使用一致的逗号风格
    'constructor-super': 2, // 要求在构造函数中有 super() 的调用
    'curly': [2, 'multi-line'], // 强制所有控制语句使用一致的括号风格
    'dot-location': [2, 'property'], // 强制在点号之前或之后换行
    'eol-last': 2, // 要求或禁止文件末尾存在空行
    'eqeqeq': [1, 'always', { 'null': 'ignore' }], // 要求使用 === 和 !==
    'generator-star-spacing': [2, { // 强制 generator 函数中 * 号周围使用一致的空格
      'before': true,
      'after': true
    }],
    'max-statements-per-line': [1, { 'max': 2 }], // 强制每行中所允许的最大语句数量
    'handle-callback-err': [2, '^(err|error)$'], // 强制回调错误处理
    'indent': [2, 2, { // 强制使用一致的缩进
      'SwitchCase': 1
    }],
    'jsx-quotes': [2, 'prefer-single'], // 强制在 JSX 属性中一致地使用双引号或单引号
    'key-spacing': [2, { // 强制在对象字面量的属性中键和值之间使用一致的间距
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, { // 强制在关键字前后使用一致的空格
      'before': true,
      'after': true
    }],
    'new-cap': [2, { // 要求构造函数首字母大写
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 2, // 要求调用无参构造函数时有圆括号
    'no-array-constructor': 2, // 禁用 Array 构造函数
    'no-caller': 2, // 禁用 arguments.caller 或 arguments.callee
    'no-console': 'off', // 禁用 console
    'no-class-assign': 2, // 禁止修改类声明的变量
    'no-cond-assign': 2, // 禁止条件表达式中出现赋值操作符
    'no-const-assign': 2, // 禁止修改 const 声明的变量
    'no-control-regex': 0, // 禁止在正则表达式中使用控制字符
    'no-delete-var': 2, // 禁止删除变量
    'no-dupe-args': 2, // 禁止在函数定义或表达式中出现重复的参数
    'no-dupe-class-members': 2, // 禁止类成员中出现重复的名称
    'no-dupe-keys': 2, // 禁止在对象字面量中出现重复的键
    'no-duplicate-case': 2, // 禁止在 switch 语句中出现重复的 case 标签
    'no-empty-character-class': 2, // 禁止在正则表达式中使用空字符集
    'no-empty-pattern': 2, // 禁止使用空解构模式
    'no-eval': 2, // 禁止使用 eval()
    'no-ex-assign': 2, // 禁止对 catch 子句中的异常重新赋值
    'no-extend-native': 2, // 禁止扩展原生对象
    'no-extra-bind': 2, // 禁止不必要的函数绑定
    'no-extra-boolean-cast': 2, // 禁止不必要的布尔类型转换
    'no-extra-parens': [2, 'functions'], // 禁止不必要的括号
    'no-fallthrough': 2, // 禁止 case 语句落空
    'no-floating-decimal': 2, // 禁止浮点小数
    'no-func-assign': 2, // 禁止对函数声明重新赋值
    'no-implied-eval': 2, // 禁止使用隐式 eval()
    'no-inner-declarations': [2, 'functions'], // 禁止在嵌套的块中出现变量声明或 function 声明
    'no-invalid-regexp': 2, // 禁止在 RegExp 构造函数中出现无效的正则表达式
    'no-irregular-whitespace': 2, // 禁止在字符串和注释之外不规则的空白
    'no-iterator': 2, // 禁止使用 __iterator__ 属性
    'no-label-var': 2, // 禁止将标签与变量同名
    'no-labels': [2, { // 禁止使用标签语句
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2, // 禁止不必要的嵌套块
    'no-mixed-spaces-and-tabs': 2, // 禁止混用空格和制表符
    'no-multi-spaces': 2, // 禁止多个空格
    'no-multi-str': 2, // 禁止多行字符串
    'no-multiple-empty-lines': [2, { // 禁止多行空行
      'max': 1
    }],
    'no-native-reassign': 2, // 禁止覆盖原生对象
    'no-negated-in-lhs': 2, // 禁止在 in 表达式中使用否定关系
    'no-new-object': 2, // 禁止使用 Object 构造函数
    'no-new-require': 2, // 禁止使用 new require
    'no-new-symbol': 2, // 禁止使用 Symbol 构造函数
    'no-new-wrappers': 2, // 禁止使用 String、Number 和 Boolean 构造函数
    'no-obj-calls': 2, // 禁止将全局对象作为函数调用
    'no-octal': 2, // 禁止使用八进制字面量
    'no-octal-escape': 2, // 禁止在字符串中使用八进制转义序列
    'no-path-concat': 2, // 禁止对 __dirname 和 __filename 进行字符串连接
    'no-proto': 2, // 禁止使用 __proto__
    'no-redeclare': 2, // 禁止重复声明变量
    'no-regex-spaces': 2, // 禁止在正则表达式中使用多个空格
    'no-return-assign': [2, 'except-parens'], // 禁止在返回语句中赋值，除非使用括号将赋值语句括起来
    'no-self-assign': 2, // 禁止自我赋值
    'no-self-compare': 2, // 禁止自我比较
    'no-sequences': 2, // 禁止使用逗号操作符
    'no-shadow-restricted-names': 2, // 禁止使用保留字作为变量名
    'no-spaced-func': 2, // 函数名和括号之间不允许有空格
    'no-sparse-arrays': 2, // 禁止使用稀疏数组
    'no-this-before-super': 2, // 禁止在 super 调用之前使用 this 或 super
    'no-throw-literal': 2, // 禁止抛出字面量错误
    'no-trailing-spaces': 2, // 禁止行尾空格
    'no-undef': 2, // 禁止使用未定义的变量
    'no-undef-init': 2, // 禁止将 undefined 赋值给变量
    'no-unexpected-multiline': 2, // 禁止使用令人困惑的多行表达式
    'no-unmodified-loop-condition': 2, // 禁止在循环条件中使用不变的变量
    'no-unneeded-ternary': [2, { // 禁止不必要的三元表达式
      'defaultAssignment': false
    }],
    'no-unreachable': 2, // 禁止在 return、throw、continue 和 break 语句后出现不可达代码
    'no-unsafe-finally': 2, // 禁止在 finally 语句块中出现控制流语句
    'no-unused-vars': [2, { // 禁止未使用过的变量
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2, // 禁止不必要的 .call() 和 .apply()
    'no-useless-computed-key': 2, // 禁止在对象中使用不必要的计算属性
    'no-useless-constructor': 2, // 禁止不必要的构造函数
    'no-useless-escape': 0, // 禁止不必要的转义字符
    'no-whitespace-before-property': 2, // 禁止属性前有空白
    'no-with': 2, // 禁用 with 语句
    'one-var': [2, { // 强制函数中的变量要么一起声明要么分开声明
      'initialized': 'never'
    }],
    'operator-linebreak': [2, 'after', { // 强制操作符使用一致的换行符风格
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [2, 'never'], // 禁止块内填充
    'quotes': [2, 'single', { // 强制使用一致的反勾号、双引号或单引号
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': [2, 'never'], // 要求或禁止使用分号代替 ASI
    'semi-spacing': [2, { // 强制分号前后有空格
      'before': false,
      'after': true
    }],
    'space-before-blocks': [2, 'always'], // 在块前添加空格
    'space-before-function-paren': [2, 'never'], // 函数括号前不加空格
    'space-in-parens': [2, 'never'], // 括号内不加空格
    'space-infix-ops': 2, // 运算符前后需要添加空格
    'space-unary-ops': [2, { // 一元运算符前后需要添加空格
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [2, 'always', { // 注释前需要添加空格
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'], // 模板字符串中不加空格
    'use-isnan': 2, // 使用 isNaN() 函数来判断 NaN
    'valid-typeof': 2, // 使用 typeof 来判断类型
    'wrap-iife': [2, 'any'], // 立即执行函数需要用括号包裹
    'yield-star-spacing': [2, 'both'], // yield * 后需要添加空格
    'yoda': [2, 'never'], // 不要使用 Yoda 表达式
    'prefer-const': 2, // 尽量使用 const 声明变量
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 生产环境中不要使用 debugger
    'object-curly-spacing': [2, 'always', { // 对象字面量中需要添加空格
      objectsInObjects: false
    }],
    'array-bracket-spacing': [2, 'never'], // 数组字面量中不需要添加空格
    'no-lonely-if': 1, // 避免使用孤立的 if 语句
    'no-var': 1 // 尽量使用 let 或 const 声明变量

  },
  'ecmaFeatures': {
    // 启用 ECMAScript 模块
    'modules': 1,
    // 启用计算属性名称
    'objectLiteralComputedProperties': 1
  }

}
