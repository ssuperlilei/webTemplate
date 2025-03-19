# 一个基于Turbo、Vue3.5+、TypeScript5+的 Monorepo 组件库模板

这是一个基于 `Turborepo + Vue 3.5 + TypeScript` 的现代化组件库模板，采用 Monorepo 架构来管理多个包，涵盖了 ESLint、Prettier、Stylelint、Commitlint + Husky + Lint-Staged 和 TypeScript 的项目规范配置。

此外，项目还包括自动化脚本和持续集成配置，以支持高效的开发流程和质量保证。

## pkg.json相关命令解读

```bash
"dev": "turbo run dev", // 启动所有包的开发环境
"dev:docs": "pnpm -F @ssuperlilei/docs run dev", // 启动文档应用
"dev:play": "pnpm -F @ssuperlilei/playground run dev", // 启动演练场
"build": "turbo run build", // 构建所有包
"build:docs": "pnpm -F @ssuperlilei/docs run build", // 构建文档应用
"build:gulp": "gulp -f build/gulpfile.cjs",// 使用gulp管理的统一打包脚本
"format": "prettier --write \"**/*.{js,jsx,ts,tsx,mjs,mts,md,vue}\"", // 格式化所有包的代码
"clean": "rm -rf .turbo && rm -rf node_modules && rm -rf dist && turbo run clean", // 清理所有包
"deps:update": "pnpm update -r --latest", // 更新所有包的依赖
"deps:check": "pnpm outdated -r", // 检查所有包的依赖
"preinstall": "npx only-allow pnpm", // 确保使用 pnpm 安装依赖
"postinstall": "turbo run build",// 安装依赖后，构建所有包，确保项目成功运行
"prepare": "husky install", // 安装 Husky 钩子
"rename-pkg": "bash ./scripts/rename-package.sh" // 一键重命名包，如：@ssuperlilei -> @vue3-lib
```

## 🚀 快速开始

```bash
# 以下请替换为自己的包名，@ssuperlilei 可以通过 rename-pkg 命令，一键更改为属于自己的包名，如 pnpm rename-pkg "@ssuperlilei" "@vue3-lib"
pnpm add @ssuperlilei/ui @ssuperlilei/utils @ssuperlilei/hooks @ssuperlilei/i18n
```

## 帮助指南

1. 如果遇到不能执行 `rm -rf` 或者 `shell` 命令的问题，可以使用git bash终端运行命令（安装git后自带的）。
   项目根目录中的，`clean`、`rename-pkg`等相关命令不能运行，可以使用上面的方法解决。
2. 如遇到 `pnpm run dev` 运行失败的问题，需要先执行一遍打包命令：`pnpm run build`，再运行 `pnpm run dev`。

## License

[MIT](LICENSE)

## 借鉴
  [vue3-turbo-component-lib-template](https://github.com/huangmingfu/vue3-turbo-component-lib-template)
