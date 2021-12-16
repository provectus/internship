module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        indent: ["error", 4],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "space-before-function-paren": ["error", { anonymous: "always", named: "never" }],
    },
}
