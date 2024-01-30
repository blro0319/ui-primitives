"use strict";

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:vue/vue3-recommended",
    "plugin:@stylistic/disable-legacy",
  ],
  plugins: ["import", "@typescript-eslint", "@stylistic"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
    },
    extraFileExtensions: [".vue"],
  },
  rules: {
    // ---------------------------------------------------------------------- //
    // ESLint Rules                                                           //
    // ---------------------------------------------------------------------- //
    // Possible Problems
    "array-callback-return": ["error", { checkForEach: true }],
    "no-await-in-loop": "warn",
    "no-cond-assign": "warn",
    "no-constant-binary-expression": "warn",
    "no-constructor-return": "error",
    "no-debugger": "warn",
    "no-duplicate-imports": "warn",
    "no-empty-pattern": "warn",
    "no-irregular-whitespace": "warn",
    "no-new-native-nonconstructor": "error",
    "no-promise-executor-return": "error",
    "no-self-compare": "warn",
    "no-template-curly-in-string": "warn",
    "no-unmodified-loop-condition": "warn",
    "no-unreachable-loop": "error",
    "no-unused-private-class-members": "warn",
    "no-unused-vars": "warn",
    "require-atomic-updates": "warn",
    // Suggestions
    "consistent-this": "error",
    "curly": ["warn", "multi-line", "consistent"],
    "default-case-last": "warn",
    "default-param-last": "off", // Replaced by @typescript-eslint/default-param-last
    "dot-notation": "warn",
    "eqeqeq": "warn",
    "grouped-accessor-pairs": ["warn", "getBeforeSet"],
    "guard-for-in": "warn",
    "logical-assignment-operators": "warn",
    "new-cap": "warn",
    "no-alert": "warn",
    "no-array-constructor": "warn",
    "no-bitwise": "warn",
    "no-caller": "error",
    "no-case-declarations": "warn",
    "no-console": "warn",
    "no-empty-function": "off", // Replaced by @typescript-eslint/no-empty-function
    "no-empty-static-block": "warn",
    "no-eval": "warn",
    "no-extend-native": "error",
    "no-extra-bind": "warn",
    "no-extra-boolean-cast": "warn",
    "no-implied-eval": "warn",
    "no-invalid-this": "error",
    "no-iterator": "error",
    "no-labels": "error",
    "no-lone-blocks": "warn",
    "no-lonely-if": "warn",
    "no-loop-func": "warn",
    "no-multi-assign": "warn",
    "no-multi-str": "warn",
    "no-nested-ternary": "warn",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-nonoctal-decimal-escape": "warn",
    "no-object-constructor": "warn",
    "no-octal": "warn",
    "no-octal-escape": "warn",
    "no-proto": "warn",
    "no-regex-spaces": "warn",
    "no-restricted-globals": [
      "error",
      { name: "event", message: "Use local parameter instead." },
    ],
    "no-return-assign": "warn",
    "no-script-url": "warn",
    "no-sequences": "warn",
    "no-unneeded-ternary": "warn",
    "no-unused-expressions": "off", // Replaced by @typescript-eslint/no-unused-expressions
    "no-unused-labels": "off", // no-labels
    "no-useless-call": "warn",
    "no-useless-catch": "warn",
    "no-useless-computed-key": "warn",
    "no-useless-concat": "warn",
    "no-useless-constructor": "warn",
    "no-useless-escape": "warn",
    "no-useless-rename": "warn",
    "no-useless-return": "warn",
    "no-var": "warn",
    "no-void": "warn",
    "object-shorthand": "warn",
    "operator-assignment": "warn",
    "prefer-const": "warn",
    "prefer-exponentiation-operator": "warn",
    "prefer-numeric-literals": "warn",
    "prefer-object-has-own": "warn",
    "prefer-object-spread": "warn",
    "prefer-regex-literals": "warn",
    "prefer-rest-params": "warn",
    "prefer-template": "warn",
    "require-await": "warn",
    "sort-imports": ["warn", { ignoreDeclarationSort: true }],
    "strict": "error",
    // ---------------------------------------------------------------------- //
    // Import Plugin Rules                                                    //
    // ---------------------------------------------------------------------- //
    "import/export": "off",
    "import/order": [
      "warn",
      {
        "groups": [
          ["builtin", "external", "internal"],
          ["parent"],
          ["sibling", "index"],
        ],
        "alphabetize": { order: "asc", caseInsensitive: true },
        "newlines-between": "never",
      },
    ],
    // ---------------------------------------------------------------------- //
    // Stylistic Rules                                                        //
    // ---------------------------------------------------------------------- //
    "@stylistic/array-bracket-newline": "warn",
    "@stylistic/array-bracket-spacing": "warn",
    "@stylistic/array-element-newline": ["warn", "consistent"],
    "@stylistic/arrow-parens": "warn",
    "@stylistic/arrow-spacing": "warn",
    "@stylistic/block-spacing": "warn",
    "@stylistic/brace-style": "warn",
    "@stylistic/comma-dangle": ["warn", "always-multiline"],
    "@stylistic/comma-spacing": "warn",
    "@stylistic/comma-style": "warn",
    "@stylistic/computed-property-spacing": "warn",
    "@stylistic/dot-location": ["warn", "property"],
    "@stylistic/eol-last": "warn",
    "@stylistic/function-call-argument-newline": ["warn", "consistent"],
    "@stylistic/function-call-spacing": "warn",
    "@stylistic/function-paren-newline": "warn",
    "@stylistic/generator-star-spacing": "warn",
    "@stylistic/implicit-arrow-linebreak": "warn",
    "@stylistic/indent": ["warn", 2],
    "@stylistic/indent-binary-ops": ["warn", 2],
    "@stylistic/key-spacing": "warn",
    "@stylistic/keyword-spacing": "warn",
    "@stylistic/max-len": [
      "warn",
      {
        tabWidth: 2,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    "@stylistic/max-statements-per-line": "warn",
    "@stylistic/member-delimiter-style": "warn",
    "@stylistic/multiline-ternary": ["warn", "always-multiline"],
    "@stylistic/new-parens": "warn",
    "@stylistic/newline-per-chained-call": "warn",
    "@stylistic/no-confusing-arrow": "warn",
    "@stylistic/no-extra-parens": "warn",
    "@stylistic/no-extra-semi": "warn",
    "@stylistic/no-floating-decimal": "warn",
    "@stylistic/no-mixed-operators": "warn",
    "@stylistic/no-mixed-spaces-and-tabs": "warn",
    "@stylistic/no-multi-spaces": "warn",
    "@stylistic/no-multiple-empty-lines": ["warn", { max: 1 }],
    "@stylistic/no-tabs": "warn",
    "@stylistic/no-trailing-spaces": "warn",
    "@stylistic/no-whitespace-before-property": "warn",
    "@stylistic/nonblock-statement-body-position": "warn",
    "@stylistic/object-curly-newline": "warn",
    "@stylistic/object-curly-spacing": ["warn", "always"],
    "@stylistic/one-var-declaration-per-line": "warn",
    "@stylistic/operator-linebreak": [
      "warn", "after",
      { overrides: { "=": "none", "?": "before", ":": "before" } },
    ],
    "@stylistic/padded-blocks": ["warn", "never"],
    "@stylistic/quote-props": ["warn", "consistent-as-needed"],
    "@stylistic/quotes": ["warn", "double", { avoidEscape: true }],
    "@stylistic/rest-spread-spacing": "warn",
    "@stylistic/semi": "warn",
    "@stylistic/semi-spacing": "warn",
    "@stylistic/semi-style": "warn",
    "@stylistic/space-before-blocks": "warn",
    "@stylistic/space-before-function-paren": [
      "warn",
      { anonymous: "always", named: "never", asyncArrow: "always" },
    ],
    "@stylistic/space-in-parens": "warn",
    "@stylistic/space-infix-ops": "warn",
    "@stylistic/space-unary-ops": "warn",
    "@stylistic/spaced-comment": ["warn", "always", { markers: ["/"] }],
    "@stylistic/switch-colon-spacing": "warn",
    "@stylistic/template-curly-spacing": "warn",
    "@stylistic/template-tag-spacing": "warn",
    "@stylistic/type-annotation-spacing": "warn",
    "@stylistic/type-generic-spacing": "warn",
    "@stylistic/type-named-tuple-spacing": "warn",
    "@stylistic/wrap-iife": "warn",
    "@stylistic/yield-star-spacing": "warn",
    // ---------------------------------------------------------------------- //
    // TypeScript Rules                                                       //
    // ---------------------------------------------------------------------- //
    "no-return-await": "off", // Replaced by @typescript-eslint/return-await
    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/array-type": "warn",
    "@typescript-eslint/ban-ts-comment": [
      "warn",
      {
        "ts-expect-error": { descriptionFormat: "^: TS\\d+" },
        "ts-ignore": { descriptionFormat: "^: TS\\d+" },
      },
    ],
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/consistent-generic-constructors": "warn",
    "@typescript-eslint/consistent-indexed-object-style": "warn",
    "@typescript-eslint/consistent-type-assertions": [
      "warn",
      { assertionStyle: "as", objectLiteralTypeAssertions: "never" },
    ],
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-exports": [
      "warn",
      { fixMixedExportsWithInlineTypeSpecifier: true },
    ],
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/default-param-last": "error",
    "@typescript-eslint/dot-notation": "warn",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "default",
        format: ["camelCase"],
      },
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
        trailingUnderscore: "allow",
      },
      {
        selector: "parameter",
        format: ["camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
      {
        selector: "import",
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: ["objectLiteralMethod", "objectLiteralProperty", "typeProperty"],
        format: null,
      },
    ],
    "@typescript-eslint/no-array-constructor": "warn",
    "@typescript-eslint/no-base-to-string": "warn",
    "@typescript-eslint/no-confusing-void-expression": "warn",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": ["warn", { allowSingleExtends: true }],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-import-type-side-effects": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-namespace": "warn",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/no-redundant-type-constituents": "off",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": [
      "warn",
      {
        allowComparingNullableBooleansToTrue: false,
        allowComparingNullableBooleansToFalse: false,
      },
    ],
    "@typescript-eslint/no-unnecessary-type-constraint": "warn",
    "@typescript-eslint/no-unused-expressions": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/non-nullable-type-assertion-style": "warn",
    "@typescript-eslint/prefer-as-const": "warn",
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-function-type": "warn",
    "@typescript-eslint/prefer-includes": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "off", // TypeError: Cannot read properties of undefined (reading 'some')
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/prefer-promise-reject-errors": "warn",
    "@typescript-eslint/prefer-reduce-type-parameter": "warn",
    "@typescript-eslint/prefer-regexp-exec": "warn",
    "@typescript-eslint/prefer-return-this-type": "warn",
    "@typescript-eslint/prefer-string-starts-ends-with": "warn",
    "@typescript-eslint/prefer-ts-expect-error": "off",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/return-await": "warn",
    "@typescript-eslint/switch-exhaustiveness-check": "warn",
    "@typescript-eslint/unified-signatures": "off",
    // ---------------------------------------------------------------------- //
    // Vue Rules                                                              //
    // ---------------------------------------------------------------------- //
    // Essential
    "vue/multi-word-component-names": "warn",
    "vue/no-dupe-v-else-if": "warn",
    "vue/no-duplicate-attributes": "warn",
    "vue/no-template-key": "warn",
    "vue/no-unused-components": "warn",
    "vue/no-unused-vars": "warn",
    "vue/require-prop-type-constructor": "warn",
    "vue/use-v-on-exact": "warn",
    // Essential for Vue.js 3.x
    "vue/no-v-for-template-key-on-child": "warn",
    "vue/prefer-import-from-vue": "warn",
    "vue/require-slots-as-functions": "warn",
    "vue/require-toggle-inside-transition": "warn",
    // Strongly Recommended
    "vue/attribute-hyphenation": "warn",
    "vue/component-definition-name-casing": "warn",
    "vue/first-attribute-linebreak": "warn",
    "vue/html-closing-bracket-newline": "warn",
    "vue/html-closing-bracket-spacing": "warn",
    "vue/html-end-tags": "warn",
    "vue/html-indent": "warn",
    "vue/html-quotes": "warn",
    "vue/html-self-closing": "warn",
    "vue/max-attributes-per-line": "off",
    "vue/multiline-html-element-content-newline": "warn",
    "vue/mustache-interpolation-spacing": "warn",
    "vue/no-multi-spaces": "warn",
    "vue/no-spaces-around-equal-signs-in-attribute": "warn",
    "vue/no-template-shadow": "warn",
    "vue/one-component-per-file": "off",
    "vue/prop-name-casing": "warn",
    "vue/require-default-prop": "warn",
    "vue/require-prop-types": "warn",
    "vue/singleline-html-element-content-newline": "warn",
    "vue/v-bind-style": "warn",
    "vue/v-on-style": "warn",
    "vue/v-slot-style": "warn",
    // Strongly Recommended for Vue.js 3.x
    "vue/require-explicit-emits": "warn",
    "vue/v-on-event-hyphenation": "warn",
    // Recommended
    "vue/attributes-order": [
      "warn",
      {
        order: [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "RENDER_MODIFIERS",
          "GLOBAL",
          "UNIQUE",
          "SLOT",
          "TWO_WAY_BINDING",
          "OTHER_DIRECTIVES",
          "OTHER_ATTR",
          "EVENTS",
          "CONTENT",
        ],
      },
    ],
    "vue/no-lone-template": "warn",
    "vue/no-v-html": "warn",
    "vue/order-in-components": "warn",
    // Uncategorized
    "vue/block-order": [
      "warn",
      {
        order: [
          "script:not([setup])",
          "script[setup]",
          "template",
          "style:not([scoped])",
          "style[scoped]",
        ],
      },
    ],
    "vue/block-tag-newline": [
      "warn",
      { singleline: "always", multiline: "always", maxEmptyLines: 0 },
    ],
    "vue/component-name-in-template-casing": "warn",
    "vue/component-options-name-casing": "warn",
    "vue/custom-event-name-casing": "warn",
    "vue/define-emits-declaration": "warn",
    "vue/define-macros-order": [
      "warn",
      {
        order: [
          "defineOptions",
          "defineModel",
          "defineProps",
          "defineEmits",
          "defineSlots",
        ],
        defineExposeLast: true,
      },
    ],
    "vue/define-props-declaration": "warn",
    "vue/html-comment-content-newline": "warn",
    "vue/html-comment-content-spacing": "warn",
    "vue/html-comment-indent": "warn",
    "vue/match-component-import-name": "warn",
    "vue/no-deprecated-model-definition": "error",
    "vue/no-duplicate-attr-inheritance": "warn",
    "vue/no-empty-component-block": "warn",
    "vue/no-ref-object-reactivity-loss": "warn",
    "vue/no-required-prop-with-default": "warn",
    "vue/no-setup-props-reactivity-loss": "warn",
    "vue/no-this-in-before-route-enter": "error",
    "vue/no-unused-emit-declarations": "warn",
    "vue/no-unused-properties": "off",
    "vue/no-unused-refs": "warn",
    "vue/no-use-v-else-with-v-for": "error",
    "vue/no-useless-mustaches": "warn",
    "vue/no-useless-v-bind": "warn",
    "vue/padding-line-between-blocks": "warn",
    "vue/prefer-define-options": "warn",
    "vue/prefer-true-attribute-shorthand": "warn",
    "vue/require-direct-export": "warn",
    "vue/require-macro-variable-name": "warn",
    "vue/v-for-delimiter-style": "warn",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.mts", "*.cts", "*.vue"],
      rules: {
        // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
        // does not work with type definitions.
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
      },
    },
    {
      files: ["*.vue"],
      rules: {
        "constructor-super": "off", // ts(2335) & ts(2377)
        "getter-return": "off", // ts(2378)
        "no-const-assign": "off", // ts(2588)
        "no-dupe-args": "off", // ts(2300)
        "no-dupe-class-members": "off", // ts(2393) & ts(2300)
        "no-dupe-keys": "off", // ts(1117)
        "no-func-assign": "off", // ts(2539)
        "no-import-assign": "off", // ts(2539) & ts(2540)
        "no-new-symbol": "off", // ts(7009)
        "no-obj-calls": "off", // ts(2349)
        "no-redeclare": "off", // ts(2451)
        "no-setter-return": "off", // ts(2408)
        "no-this-before-super": "off", // ts(2376)
        "no-undef": "off", // ts(2304)
        "no-unreachable": "off", // ts(7027)
        "no-unsafe-negation": "off", // ts(2365) & ts(2360) & ts(2358)
        "valid-typeof": "off", // ts(2367)
      },
    },
  ],
};
