/**
 * Prettier 配置文件
 *
 * Prettier 是一个代码格式化工具，支持多种语言
 * 它会自动格式化代码，确保团队代码风格的一致性
 *
 * 官方文档：https://prettier.io/docs/en/options.html
 */

export default {
  // ==================== 基础格式化选项 ====================

  /**
   * printWidth - 每行代码的最大字符数
   *
   * 当一行代码超过此长度时，Prettier 会尝试换行
   * 注意：这不是硬性限制，某些情况下（如长字符串）会超过此限制
   *
   * 默认值：80
   * 推荐值：80-120
   */
  printWidth: 100,

  /**
   * tabWidth - Tab 键的空格数
   *
   * 指定一个 Tab 等于多少个空格
   * 影响缩进的宽度
   *
   * 默认值：2
   * 常用值：2 或 4
   */
  tabWidth: 2,

  /**
   * useTabs - 是否使用 Tab 缩进
   *
   * true: 使用 Tab 字符进行缩进
   * false: 使用空格进行缩进
   *
   * 默认值：false
   * 推荐：false（空格更通用，在不同编辑器中显示一致）
   */
  useTabs: false,

  // ==================== 语法格式选项 ====================

  /**
   * semi - 是否在语句末尾添加分号
   *
   * true: 在每个语句末尾添加分号
   * false: 只在必要时添加分号（行首为 [、(、`、+、- 等）
   *
   * 默认值：true
   *
   * 示例：
   * true:  const name = 'Vue';
   * false: const name = 'Vue'
   */
  semi: false,

  /**
   * singleQuote - 是否使用单引号
   *
   * true: 使用单引号代替双引号
   * false: 使用双引号
   *
   * 默认值：false
   *
   * 示例：
   * true:  const name = 'Vue'
   * false: const name = "Vue"
   *
   * 注意：JSX 中的引号不受此影响，JSX 始终使用双引号
   */
  singleQuote: true,

  /**
   * trailingComma - 多行时是否添加尾随逗号
   *
   * 选项：
   * - "none": 不添加尾随逗号
   * - "es5": 在 ES5 中有效的地方添加（对象、数组等）
   * - "all": 尽可能添加尾随逗号（包括函数参数）
   *
   * 默认值："all"
   *
   * 示例（"es5"）：
   * const obj = {
   *   name: 'Vue',
   *   version: 3,  // ← 尾随逗号
   * }
   *
   * 优点：
   * 1. Git diff 更清晰（新增行不会影响上一行）
   * 2. 更容易添加/删除/重排项目
   */
  trailingComma: 'es5',

  // ==================== 间距格式选项 ====================

  /**
   * bracketSpacing - 对象字面量的大括号之间是否添加空格
   *
   * true: { name: 'Vue' }
   * false: {name: 'Vue'}
   *
   * 默认值：true
   * 推荐：true（更易读）
   */
  bracketSpacing: true,

  /**
   * arrowParens - 箭头函数参数是否始终使用括号
   *
   * 选项：
   * - "always": 始终使用括号
   * - "avoid": 在可能的情况下省略括号
   *
   * 默认值："always"
   *
   * 示例：
   * "always": (x) => x * 2
   * "avoid":  x => x * 2
   *
   * 推荐：always（TypeScript 中类型注解需要括号，保持一致性）
   */
  arrowParens: 'always',

  // ==================== HTML/Vue 特定选项 ====================

  /**
   * htmlWhitespaceSensitivity - HTML 空白符敏感度
   *
   * 选项：
   * - "css": 遵循 CSS display 属性的默认值
   * - "strict": 所有标签周围的空白符都被认为是有意义的
   * - "ignore": 所有标签周围的空白符都被认为是无意义的
   *
   * 默认值："css"
   *
   * "ignore" 的优点：
   * - 更激进的格式化，不用担心空白符影响布局
   * - 对于使用 flexbox/grid 的现代布局更友好
   */
  htmlWhitespaceSensitivity: 'ignore',

  /**
   * vueIndentScriptAndStyle - Vue 文件中是否缩进 <script> 和 <style> 标签内的代码
   *
   * true: 缩进 <script> 和 <style> 标签内的代码
   * false: 不缩进
   *
   * 默认值：false
   *
   * 示例（true）：
   * <script>
   *   export default {
   *     name: 'App'
   *   }
   * </script>
   *
   * 示例（false）：
   * <script>
   * export default {
   *   name: 'App'
   * }
   * </script>
   */
  vueIndentScriptAndStyle: true,

  // ==================== 换行符选项 ====================

  /**
   * endOfLine - 换行符类型
   *
   * 选项：
   * - "lf": Line Feed only (\n)，Unix/Linux/macOS 使用
   * - "crlf": Carriage Return + Line Feed (\r\n)，Windows 使用
   * - "cr": Carriage Return only (\r)，旧版 macOS 使用
   * - "auto": 保持现有的换行符，对混合换行符的文件规范为第一行的换行符
   *
   * 默认值："lf"
   *
   * 推荐：auto
   * - 避免在跨平台开发时出现大量文件变更
   * - Git 可以通过 core.autocrlf 配置处理换行符转换
   */
  endOfLine: 'auto',
}
