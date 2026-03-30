# react-ts-template

基于 **React 19**、**TypeScript** 与 **Vite 6** 的前端脚手架，内置开发代理、多环境配置与一套可落地的工程化约定（ESLint、Prettier、Husky、约定式提交等）。适合作为个人或团队新项目的起点，也可直接 fork 后按需裁剪。

**English:** A React + TypeScript + Vite starter with linting, formatting, Git commit conventions, and multi-env dev setup.

## 特性

- **现代栈**：React 19、TypeScript 5、Vite 6（HMR、按需构建）。
- **多环境**：通过 Vite `mode` 区分 development / test / production，环境变量放在 **`src/env/`**（如 `.env.development`）。
- **本地开发**：可配置开发服务端口、**开发代理**（将前端请求前缀转发到后端地址，便于规避跨域）。
- **代码风格**：`.editorconfig` + **Prettier**（`.prettierrc`），减少不同编辑器下的无意义 diff。
- **质量与协作**：ESLint（含 React、Hooks、可访问性）、**lint-staged**、**Commitlint** + **Commitizen**（Conventional Commits）。

## 快速开始

```bash
git clone https://github.com/sunyan077/react-ts-template.git my-app
cd my-app
npm install
npm run start:dev
```

浏览器默认会打开本地开发地址；端口等项见 **`src/env/`** 中与当前 mode 对应的 `.env.*` 文件。

常用脚本：

| 命令                 | 说明                                |
| -------------------- | ----------------------------------- |
| `npm run start:dev`  | 开发模式（`development`）           |
| `npm run start:test` | 测试环境配置（`test`）              |
| `npm run start:prod` | 使用 production 相关 env 起本地服务 |
| `npm run build`      | `tsc -b` 类型检查 + `vite build`    |
| `npm run preview`    | 预览生产构建                        |
| `npm run lint`       | ESLint 检查                         |
| `npm run format`     | Prettier 格式化 `src` 下约定文件    |
| `npm run commit`     | 使用 Commitizen 交互式提交          |

## 环境变量说明（概要）

在 **`src/env/`** 中按环境维护变量，需以 **`VITE_`** 为前缀才能在客户端代码中通过 `import.meta.env` 使用。与本模板默认 dev 代理相关的示例：

- **`VITE_SERVER_PORT`**：开发服务器端口。
- **`VITE_API_BASE_URL`**：前端请求使用的路径前缀（用于配置代理的匹配键）。
- **`VITE_API_TARGET_URL`**：代理转发的目标后端地址。

具体键名与示例值以仓库内 `.env.*` 为准；复制本模板后请改为你的真实后端地址。

---

## 工程化与规范

### 代码质量（ESLint）

- 配置：`eslint.config.js`（ESLint 9 flat config），作用范围 `**/*.{ts,tsx}`，忽略 `dist`。
- 包含：**typescript-eslint**、**React**（含 Hooks、Fast Refresh）、**jsx-a11y**，并与 **Prettier** 通过 `eslint-config-prettier` / `eslint-plugin-prettier` 协同。

### 格式化（Prettier）

与 ESLint 分工明确；提交前建议执行 `npm run format` 或依赖编辑器「保存时格式化」并选用项目 Prettier 配置。

### 暂存区（lint-staged）

`package.json` 中 **lint-staged** 对暂存的 `*.{ts,tsx,js,jsx,json,css,md}` 执行 Prettier 与 ESLint 修复。若本地为 Husky 配置了 **`pre-commit`** 调用 `lint-staged`，可在提交前自动统一风格；也可手动执行 `npx lint-staged`。

### Git 提交

- **`.husky/commit-msg`**：使用 **commitlint** + **@commitlint/config-conventional**，提交说明需符合 **Conventional Commits**（如 `feat:`、`fix:`、`chore:`）。
- **`npm run commit`**：通过 **Commitizen**（`cz-conventional-changelog`）交互式生成规范说明。
- **`prepare`**：安装依赖后执行 **husky install**，以便团队成员拉代码后钩子一致生效。

---

若本模板对你有帮助，欢迎 Star 或提 Issue / PR。fork 后请记得修改 `package.json` 中的项目名称，并替换示例接口与环境变量为你的业务配置。
