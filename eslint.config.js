/**
 * ESLint 配置文件 (ESLint 9+ 扁平配置格式)
 * 
 * ESLint 是一个用于识别和报告 JavaScript/TypeScript 代码中的模式的工具
 * 目的是使代码更加一致并避免错误
 */

// 导入 ESLint 核心推荐配置
import js from '@eslint/js'
// 导入 Vue.js 官方 ESLint 插件
import vue from 'eslint-plugin-vue'
// 导入 TypeScript ESLint 插件和解析器
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
// 导入 Vue 文件解析器
import vueParser from 'vue-eslint-parser'
// 导入 Prettier 插件和配置（用于代码格式化集成）
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  // ==================== 基础配置 ====================
  
  // 应用 ESLint 推荐的核心规则
  js.configs.recommended,
  
  // 应用 Vue 3 推荐的规则集（包括必要的和强烈推荐的规则）
  ...vue.configs['flat/recommended'],
  
  // 应用 Prettier 配置，禁用所有与 Prettier 冲突的 ESLint 规则
  // 这确保 ESLint 专注于代码质量，Prettier 专注于代码格式
  prettierConfig,
  
  // ==================== 主要配置对象 ====================
  {
    // 指定要检查的文件类型
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    
    // -------------------- 语言选项 --------------------
    languageOptions: {
      // 使用 Vue 解析器作为主解析器（用于解析 .vue 文件）
      parser: vueParser,
      
      parserOptions: {
        // 在 <script> 标签内使用 TypeScript 解析器
        parser: typescriptParser,
        // 使用最新的 ECMAScript 版本
        ecmaVersion: 'latest',
        // 代码是 ECMAScript 模块
        sourceType: 'module',
      },
      
      // -------------------- 全局变量声明 --------------------
      // 声明全局可用的变量，避免 ESLint 报 'no-undef' 错误
      // 'readonly' 表示变量只读，不能被重新赋值
      globals: {
        // === 浏览器环境全局变量 ===
        window: 'readonly',      // 浏览器窗口对象
        document: 'readonly',    // DOM 文档对象
        console: 'readonly',     // 控制台对象
        
        // === Node.js 环境全局变量 ===
        process: 'readonly',     // Node.js 进程对象
        __dirname: 'readonly',   // 当前模块目录名
        __filename: 'readonly',  // 当前模块文件名
        module: 'readonly',      // 当前模块对象
        require: 'readonly',     // CommonJS 导入函数
        
        // === Vue 3 Composition API（自动导入） ===
        // 响应式 API
        ref: 'readonly',              // 创建响应式引用
        computed: 'readonly',         // 创建计算属性
        reactive: 'readonly',         // 创建响应式对象
        readonly: 'readonly',         // 创建只读响应式对象
        
        // 侦听器 API
        watch: 'readonly',            // 侦听响应式数据变化
        watchEffect: 'readonly',      // 自动追踪依赖的副作用函数
        
        // 生命周期钩子
        onMounted: 'readonly',        // 组件挂载后执行
        onUnmounted: 'readonly',      // 组件卸载前执行
        onBeforeMount: 'readonly',    // 组件挂载前执行
        onBeforeUnmount: 'readonly',  // 组件卸载前执行
        onUpdated: 'readonly',        // 组件更新后执行
        onBeforeUpdate: 'readonly',   // 组件更新前执行
        
        // 工具函数
        nextTick: 'readonly',         // 等待下次 DOM 更新
        toRef: 'readonly',            // 为响应式对象的属性创建 ref
        toRefs: 'readonly',           // 将响应式对象转换为普通对象，每个属性都是 ref
        unref: 'readonly',            // 返回 ref 的值或原始值
        isRef: 'readonly',            // 检查值是否为 ref
        
        // === Pinia 状态管理（自动导入） ===
        defineStore: 'readonly',      // 定义 Store
        storeToRefs: 'readonly',      // 从 Store 中提取响应式引用
        acceptHMRUpdate: 'readonly',  // 启用热模块替换
        
        // === Vue Router 路由（自动导入） ===
        useRouter: 'readonly',        // 获取路由实例
        useRoute: 'readonly',         // 获取当前路由信息
        
        // === TypeScript 类型（自动导入） ===
        Ref: 'readonly',              // Ref 类型
        ComputedRef: 'readonly',      // ComputedRef 类型
      },
    },
    
    // -------------------- 插件配置 --------------------
    plugins: {
      // TypeScript ESLint 插件，提供 TypeScript 特定的规则
      '@typescript-eslint': typescript,
      // Prettier 插件，将 Prettier 作为 ESLint 规则运行
      prettier: prettier,
    },
    
    // -------------------- 规则配置 --------------------
    rules: {
      // === Vue 相关规则 ===
      
      // 关闭组件名必须为多个单词的限制
      // 默认 Vue 要求组件名为多个单词以避免与 HTML 元素冲突
      // 'off' = 关闭此规则
      'vue/multi-word-component-names': 'off',
      
      // === TypeScript 相关规则 ===
      
      // 允许使用 any 类型
      // 在快速开发或某些场景下，any 类型是有用的
      // 'off' = 关闭此规则
      '@typescript-eslint/no-explicit-any': 'off',
      
      // 警告未使用的变量
      // 帮助发现代码中未使用的变量，保持代码整洁
      // 'warn' = 警告级别（不会阻止代码运行）
      '@typescript-eslint/no-unused-vars': 'warn',
      
      // === Prettier 相关规则 ===
      
      // 将 Prettier 格式问题作为 ESLint 警告显示
      'prettier/prettier': [
        'warn',  // 警告级别
        {
          // 自动处理不同操作系统的换行符差异
          // Windows 使用 CRLF (\r\n)，Unix/Mac 使用 LF (\n)
          endOfLine: 'auto',
        },
      ],
    },
  },
  
  // ==================== 忽略配置 ====================
  {
    // 指定 ESLint 应该忽略的文件和目录
    ignores: [
      'node_modules',              // Node.js 依赖目录
      'dist',                      // 构建输出目录
      '*.config.js',               // 所有配置文件（如 vite.config.js）
      '*.config.ts',               // TypeScript 配置文件
      'src/auto-imports.d.ts',     // 自动导入生成的类型声明文件
      'src/components.d.ts',       // 组件自动导入生成的类型声明文件
    ],
  },
]

