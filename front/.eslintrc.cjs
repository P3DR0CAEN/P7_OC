/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-prettier",
        "prettier/vue",
    ],
    rules: {
        indent: ["error", 4],
    },
    env: {
        "vue/setup-compiler-macros": true,
    },
};
