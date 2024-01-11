module.exports = {
    // 继承 Eslint 规则
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    env: {
        node: true, // 启用node中全局变量
        browser: true, // 启用浏览器中全局变量
    },
    parserOptions: {
        ecmaVersion: 2022, // es6
        sourceType: "module", // es module
    },
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
        "no-var": 2,
        "no-unused-vars": 0,
        "prefer-const": 0,
        "no-inner-declarations": 0,
        "@typescript-eslint/no-unused-vars": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/prefer-as-const": 0,
        "@typescript-eslint/ban-types": 0
    },
};
