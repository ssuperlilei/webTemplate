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
npm install @ssuperlilei-lib/ui @ssuperlilei-lib/utils @ssuperlilei-lib/hooks @ssuperlilei-lib/directives
```

```bash [yarn]
yarn add @ssuperlilei-lib/ui @ssuperlilei-lib/utils @ssuperlilei-lib/hooks @ssuperlilei-lib/directives
```

```bash [pnpm]
pnpm add @ssuperlilei-lib/ui @ssuperlilei-lib/utils @ssuperlilei-lib/hooks @ssuperlilei-lib/directives
```

```bash [bun]
bun add @ssuperlilei-lib/ui @ssuperlilei-lib/utils @ssuperlilei-lib/hooks @ssuperlilei-lib/directives
```

:::

## Usage

### UI Components

```ts
// Global import
import { createApp } from 'vue';
import UI from '@ssuperlilei-lib/ui';
import '@ssuperlilei-lib/ui/style.css';
const app = createApp(App);
app.use(UI);
// Additionally, add the following configuration to tsconfig.json for type hints:
// "types": ["@ssuperlilei-lib/ui/global.d.ts"]

// Import on demand
import { Button } from '@ssuperlilei-lib/ui';
import '@ssuperlilei-lib/ui/style.css';
const app = createApp(App);
app.use(Button);
```

### Utility Functions

```ts
import { isString } from '@ssuperlilei-lib/utils';
console.log(isString('hello')); // true
```

### Hooks

```ts
import { useCounter } from '@ssuperlilei-lib/hooks';
const { count, increment, decrement } = useCounter();
```

### Directives

```ts
import { vFocus } from '@ssuperlilei-lib/directives';
// Global import
app.directive('focus', vFocus);

// Import on demand
import { vFocus } from '@ssuperlilei-lib/directives';
app.directive('focus', vFocus);
```
