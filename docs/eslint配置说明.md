# 项目配置说明文档

本文档详细说明了项目中 ESLint 和 Prettier 的配置规则。

---

## 📋 目录

- [ESLint 配置说明](#eslint-配置说明)
- [Prettier 配置说明](#prettier-配置说明)
- [配置文件关系](#配置文件关系)
- [常用命令](#常用命令)
- [规则级别说明](#规则级别说明)

---

## 🔍 ESLint 配置说明

配置文件：`eslint.config.js`

### 什么是 ESLint？

ESLint 是一个**代码质量检查工具**，用于：
- 🐛 **发现代码错误**：如未声明的变量、未使用的变量等
- 📏 **统一代码风格**：如缩进、引号使用等
- 🎯 **最佳实践**：提示可能存在问题的代码模式

### 配置结构

#### 1. 基础配置

```javascript
js.configs.recommended           // ESLint 核心推荐规则
...vue.configs['flat/recommended'] // Vue 3 推荐规则
prettierConfig                    // Prettier 兼容配置
```

#### 2. 解析器配置

- **主解析器**：`vue-eslint-parser` - 解析 `.vue` 文件
- **脚本解析器**：`@typescript-eslint/parser` - 解析 TypeScript 代码

#### 3. 全局变量声明

由于项目使用了**自动导入**功能，需要在 ESLint 中声明这些全局变量：

| 类型 | 变量示例 | 说明 |
|------|---------|------|
| **浏览器** | `window`, `document` | 浏览器环境全局对象 |
| **Node.js** | `process`, `require` | Node.js 环境变量 |
| **Vue API** | `ref`, `computed`, `watch` | Vue 3 Composition API |
| **生命周期** | `onMounted`, `onUnmounted` | Vue 生命周期钩子 |
| **Pinia** | `defineStore`, `storeToRefs` | 状态管理 API |
| **Router** | `useRouter`, `useRoute` | 路由 API |

#### 4. 自定义规则

| 规则 | 级别 | 说明 |
|------|------|------|
| `vue/multi-word-component-names` | `off` | 允许单词组件名（如 `App.vue`） |
| `@typescript-eslint/no-explicit-any` | `off` | 允许使用 `any` 类型 |
| `@typescript-eslint/no-unused-vars` | `warn` | 警告未使用的变量 |
| `prettier/prettier` | `warn` | Prettier 格式问题显示为警告 |

#### 5. 忽略文件

以下文件/目录不会被 ESLint 检查：

```
node_modules/           # 依赖包
dist/                   # 构建输出
*.config.js             # 配置文件
*.config.ts             # TypeScript 配置
src/auto-imports.d.ts   # 自动生成的类型声明
src/components.d.ts     # 组件类型声明
```

---

## 🎨 Prettier 配置说明

配置文件：`.prettierrc.js`

### 什么是 Prettier？

Prettier 是一个**代码格式化工具**，特点：
- ⚡ **自动格式化**：保存即格式化，无需手动调整
- 🎯 **固执己见**：配置项少，避免团队争论代码风格
- 🔧 **支持多种语言**：JavaScript、TypeScript、Vue、CSS、Markdown 等

### 详细配置项

#### 1. 基础格式化

| 配置项 | 值 | 说明 | 效果 |
|--------|---|------|------|
| `printWidth` | `100` | 每行最大字符数 | 超过100字符会尝试换行 |
| `tabWidth` | `2` | Tab = 2个空格 | 缩进宽度 |
| `useTabs` | `false` | 使用空格缩进 | 不使用 Tab 字符 |

**示例：**
```javascript
// printWidth: 100
function longFunction(param1, param2, param3, param4) {
  return param1 + param2 + param3 + param4
}

// 如果超过 100 字符，会换行：
function veryLongFunction(
  param1,
  param2,
  param3,
  param4,
  param5
) {
  return param1 + param2 + param3 + param4 + param5
}
```

#### 2. 语法格式

| 配置项 | 值 | 说明 | 效果 |
|--------|---|------|------|
| `semi` | `false` | 不使用分号 | `const a = 1` |
| `singleQuote` | `true` | 使用单引号 | `'Hello'` 而不是 `"Hello"` |
| `trailingComma` | `'es5'` | ES5 兼容的尾随逗号 | 对象、数组末尾加逗号 |

**示例对比：**

```javascript
// semi: false (当前配置)
const name = 'Vue'
const version = 3

// semi: true (如果改为 true)
const name = 'Vue';
const version = 3;
```

```javascript
// singleQuote: true (当前配置)
const message = 'Hello World'

// singleQuote: false (如果改为 false)
const message = "Hello World"
```

```javascript
// trailingComma: 'es5' (当前配置)
const config = {
  name: 'Vue',
  version: 3,  // ← 有尾随逗号
}

const numbers = [
  1,
  2,
  3,  // ← 有尾随逗号
]

// trailingComma: 'none' (如果改为 none)
const config = {
  name: 'Vue',
  version: 3   // ← 无尾随逗号
}
```

**尾随逗号的优点：**
1. **Git diff 更清晰** - 添加新行时不会影响上一行
2. **更易维护** - 添加/删除/重排项目更方便

#### 3. 间距格式

| 配置项 | 值 | 说明 | 效果 |
|--------|---|------|------|
| `bracketSpacing` | `true` | 对象大括号内有空格 | `{ name: 'Vue' }` |
| `arrowParens` | `'always'` | 箭头函数总是使用括号 | `(x) => x` |

**示例对比：**

```javascript
// bracketSpacing: true (当前配置)
const obj = { name: 'Vue', version: 3 }

// bracketSpacing: false (如果改为 false)
const obj = {name: 'Vue', version: 3}
```

```javascript
// arrowParens: 'always' (当前配置)
const double = (x) => x * 2
const add = (a, b) => a + b

// arrowParens: 'avoid' (如果改为 avoid)
const double = x => x * 2        // 单参数省略括号
const add = (a, b) => a + b      // 多参数仍需括号
```

#### 4. Vue/HTML 特定

| 配置项 | 值 | 说明 | 效果 |
|--------|---|------|------|
| `htmlWhitespaceSensitivity` | `'ignore'` | 忽略 HTML 空白符 | 更激进的格式化 |
| `vueIndentScriptAndStyle` | `true` | Vue 文件中缩进 script/style | 代码缩进一致 |

**示例：**

```vue
<!-- vueIndentScriptAndStyle: true (当前配置) -->
<template>
  <div>Hello</div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  
  const count = ref(0)
</script>

<style scoped>
  .container {
    color: red;
  }
</style>
```

```vue
<!-- vueIndentScriptAndStyle: false (如果改为 false) -->
<template>
  <div>Hello</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<style scoped>
.container {
  color: red;
}
</style>
```

#### 5. 换行符

| 配置项 | 值 | 说明 | 适用场景 |
|--------|---|------|----------|
| `endOfLine` | `'auto'` | 自动检测换行符 | 跨平台开发 |

**换行符类型：**
- `lf` (`\n`) - Linux/Mac 使用
- `crlf` (`\r\n`) - Windows 使用
- `auto` - 保持现有格式，避免不必要的文件变更

---

## 🔗 配置文件关系

```
项目根目录
├── eslint.config.js        # ESLint 配置（代码质量检查）
├── .prettierrc.js          # Prettier 配置（代码格式化）
├── .prettierignore         # Prettier 忽略文件
└── package.json            # 脚本命令
```

### ESLint 和 Prettier 的分工

| 工具 | 职责 | 示例 |
|------|------|------|
| **ESLint** | 代码质量、最佳实践 | ✅ 检测未使用的变量<br>✅ 检测潜在错误<br>✅ 强制最佳实践 |
| **Prettier** | 代码格式、样式 | ✅ 统一缩进<br>✅ 统一引号<br>✅ 统一换行 |

### 集成方式

1. **eslint-config-prettier** - 禁用 ESLint 中与 Prettier 冲突的规则
2. **eslint-plugin-prettier** - 将 Prettier 作为 ESLint 规则运行
3. 结果：运行 `pnpm run lint` 时会同时检查代码质量和格式

---

## 🚀 常用命令

```bash
# 检查并自动修复代码问题（ESLint + Prettier）
pnpm run lint

# 仅格式化代码（Prettier）
pnpm run format

# 开发模式（会实时显示 ESLint 错误）
pnpm run dev

# 构建项目（构建前会进行类型检查）
pnpm run build
```

---

## 📊 规则级别说明

### ESLint 规则级别

| 级别 | 值 | 说明 | 行为 |
|------|---|------|------|
| **关闭** | `"off"` 或 `0` | 禁用规则 | 不检查 |
| **警告** | `"warn"` 或 `1` | 警告级别 | 显示警告，不阻止运行 |
| **错误** | `"error"` 或 `2` | 错误级别 | 显示错误，阻止运行 |

### 示例

```javascript
rules: {
  // 完全关闭
  'vue/multi-word-component-names': 'off',
  
  // 警告（不会阻止代码运行）
  '@typescript-eslint/no-unused-vars': 'warn',
  
  // 错误（会阻止代码运行）
  'no-console': 'error',
}
```

---

## 🛠️ 如何修改配置

### 修改 ESLint 规则

编辑 `eslint.config.js`：

```javascript
rules: {
  // 添加新规则
  'no-console': 'warn',  // 警告使用 console
  'no-debugger': 'error', // 禁止使用 debugger
  
  // 修改现有规则
  '@typescript-eslint/no-unused-vars': 'error', // 改为错误级别
}
```

### 修改 Prettier 配置

编辑 `.prettierrc.js`：

```javascript
export default {
  printWidth: 120,     // 改为 120 字符
  semi: true,          // 使用分号
  singleQuote: false,  // 使用双引号
}
```

### 配置生效

修改配置后：
1. **ESLint**: 立即生效（可能需要重启 IDE）
2. **Prettier**: 立即生效
3. 运行 `pnpm run lint` 验证

---

## 📝 最佳实践

### 1. 开发时

- ✅ 安装 ESLint 和 Prettier 的 IDE 插件
- ✅ 启用"保存时自动格式化"
- ✅ 提交前运行 `pnpm run lint`

### 2. 团队协作

- ✅ 不要随意修改配置
- ✅ 配置变更需要团队讨论
- ✅ 统一使用相同的编辑器设置

### 3. CI/CD

```bash
# 在 CI 流程中添加
pnpm run lint        # 检查代码质量
pnpm run build       # 构建项目
```

---

## 🔧 故障排除

### 问题 1：ESLint 报错 "xxx is not defined"

**原因**：使用了自动导入的 API，但未在 `globals` 中声明

**解决**：在 `eslint.config.js` 的 `globals` 中添加：

```javascript
globals: {
  yourAPI: 'readonly',
}
```

### 问题 2：Prettier 和 ESLint 规则冲突

**原因**：ESLint 规则与 Prettier 格式冲突

**解决**：确保 `eslint-config-prettier` 在配置的最后：

```javascript
export default [
  // ... 其他配置
  prettierConfig,  // ← 必须在最后
]
```

### 问题 3：自动格式化不生效

**解决步骤**：
1. 检查 IDE 是否安装了 Prettier 插件
2. 检查是否启用了"保存时格式化"
3. 手动运行 `pnpm run format` 测试

---

## 📚 参考资料

- [ESLint 官方文档](https://eslint.org/)
- [Prettier 官方文档](https://prettier.io/)
- [Vue ESLint 插件](https://eslint.vuejs.org/)
- [TypeScript ESLint](https://typescript-eslint.io/)

---

**最后更新时间：** 2025-11-01

