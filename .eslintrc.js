module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    // 'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-expressions': process.env.NODE_ENV === 'production' ? 'warn' : 'off', //禁止未使用过的表达式
    indent: ['warn', 2, {SwitchCase: 1}],
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
    'object-curly-spacing': ['warn', 'never'], //花括号内空格
    'array-bracket-spacing': ['warn', 'never'], //方括号内空格
    'space-in-parens': ['warn', 'never'], //圆括号内的空格
    'computed-property-spacing': ['warn', 'never'], //括号和其内部值之间的空格
    'space-before-function-paren': ['error', 'never'], //禁止在参数的 ( 前面有空格
    'func-call-spacing': ['error', 'never'], //禁止在函数名和开括号之间有空格
    'comma-dangle': ['warn', 'only-multiline'], //当最后一个元素或属性与闭括号 ] 或 } 在不同的行时，允许（但不要求）使用拖尾逗号；当在同一行时，禁止使用拖尾逗号
    'brace-style': ['warn', 'stroustrup', {allowSingleLine: true}], //大括号风格与缩进风格，允许块的开括号和闭括号在同一行
    // prettier: [
    //   'warn',
    //   {
    //     'htmlWhitespaceSensitivity': 'ignore', //指定HTML文件的全局空白区域敏感度
    //     'printWidth': 120, //超过最大值换行
    //     'tabWidth': 2, //缩进字节数
    //     'semi': false, //句尾添加分号
    //     'singleQuote': true, //使用单引号代替双引号
    //     'jsxSingleQuote': true, //在jsx中使用单引号代替双引号
    //     'jsxBracketSameLine': false, //在jsx中把'>' 单独放一行
    //     'bracketSpacing': false, //在对象，数组括号与文字之间加空格 '{ foo: bar }'
    //     'arrowParens': false, //(x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
    //     'trailingComma': 'es5', //在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
    //     'eslintIntegration': true, //让prettier使用eslint的代码格式进行校验
    //   }
    // ],
  }
}
