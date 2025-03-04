# Quick Start

## Introduction

ll_lib-template is a component library and toolkit template project based on Vue3, consisting of the following parts:

- UI Component Library: Provides commonly used UI components
- Utility Functions: Offers common utility functions
- Hooks: Provides reusable composable functions
- Directives: Offers commonly used directives

## Installation

Install using a package manager:

::: code-group

```bash [npm]
npm install @ssuperlilei/ui @ssuperlilei/utils @ssuperlilei/hooks @ssuperlilei/directives
```

```bash [yarn]
yarn add @ssuperlilei/ui @ssuperlilei/utils @ssuperlilei/hooks @ssuperlilei/directives
```

```bash [pnpm]
pnpm add @ssuperlilei/ui @ssuperlilei/utils @ssuperlilei/hooks @ssuperlilei/directives
```

```bash [bun]
bun add @ssuperlilei/ui @ssuperlilei/utils @ssuperlilei/hooks @ssuperlilei/directives
```

:::

## Usage

### UI Components

```ts
// Global import
import { createApp } from 'vue';
import UI from '@ssuperlilei/ui';
import '@ssuperlilei/ui/style.css';
const app = createApp(App);
app.use(UI);
// Additionally, add the following configuration to tsconfig.json for type hints:
// "types": ["@ssuperlilei/ui/global.d.ts"]

// Import on demand
import { Button } from '@ssuperlilei/ui';
import '@ssuperlilei/ui/style.css';
const app = createApp(App);
app.use(Button);
```

### Utility Functions

```ts
import { isString } from '@ssuperlilei/utils';
console.log(isString('hello')); // true
```

### Hooks

```ts
import { useCounter } from '@ssuperlilei/hooks';
const { count, increment, decrement } = useCounter();
```

### Directives

```ts
import { vFocus } from '@ssuperlilei/directives';
// Global import
app.directive('focus', vFocus);

// Import on demand
import { vFocus } from '@ssuperlilei/directives';
app.directive('focus', vFocus);
```
