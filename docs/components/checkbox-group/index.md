<script setup lang="ts">
import Snippet from "./Snippet.vue";
</script>

# Checkbox Group

## 개요

<VComponentPreview>
  <Snippet />
</VComponentPreview>

::: code-group

<<< @/components/checkbox/Snippet.vue#template [Template]
<<< @/components/checkbox/Snippet.vue#script [Script]
<<< @/components/checkbox/Snippet.vue#styles [Styles]

:::

## 구조

```vue-html
<VCheckboxGroup>
  <VCheckboxGroupTitle />
  <VCheckboxGroupDescription />
  <VCheckboxGroupError />
  <!-- 체크박스 필드 -->
</VCheckboxGroup>
```

## `<VCheckboxGroup>`

### 속성

`as`

: - 유형: `string`
  - 기본값: `"fieldset"`

  [`<fieldset>` 요소](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset)요소로 렌더링되어야 합니다.

`modelValue` (필수)

: - 유형: `any[] | Set<any>`

`defaultValue`

: - 유형: `any[] | Set<any>`

`rules`

: - 유형: `Rule<string, any[] | Set<any>>[]`
  - 기본값: `[]`

  유효성 검사 규칙입니다. [유효성 검사](/guide/basic/validation/)에서 사용됩니다.

`validityMessages`

: - 유형: `Record<string, string>`
  - 기본값: `{}`

  유효성 검사 메시지입니다. [유효성 검사](/guide/basic/validation/)에서 사용됩니다.

`disabled`

: - 유형: `boolean`
  - 기본값: `false`

  설정되면 필드셋을 비활성화합니다.

`maxLength`

: - 유형: `number`

  선택할 수 있는 항목의 최대 개수입니다. 설정된 개수보다 많은 항목을 선택하려고 하면 선택되지 않습니다. 유효성 검사에는 영향을 주지 않습니다.

### 메서드

`focus`

: ```ts
  function focus(options?: FocusOptions) => void;
  ```

  필드셋의 첫 번째 체크박스에 초점을 설정합니다.

## `<VCheckboxGroupTitle>`

### 속성

`as`

: - 유형: `string`
  - 기본값: `"div"`

## `<VCheckboxGroupDescription>`

### 속성

`as`

: - 유형: `string`
  - 기본값: `"div"`

## `<VCheckboxGroupError>`

### 속성

`as`

: - 유형: `string`
  - 기본값: `"div"`
