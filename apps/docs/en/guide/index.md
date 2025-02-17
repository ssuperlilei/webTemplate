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
npm install @ll_lib/ui @ll_lib/utils @ll_lib/hooks @ll_lib/directives
```

```bash [yarn]
yarn add @ll_lib/ui @ll_lib/utils @ll_lib/hooks @ll_lib/directives
```

```bash [pnpm]
pnpm add @ll_lib/ui @ll_lib/utils @ll_lib/hooks @ll_lib/directives
```

```bash [bun]
bun add @ll_lib/ui @ll_lib/utils @ll_lib/hooks @ll_lib/directives
```

:::

## Usage

### UI Components

```ts
// Global import
import { createApp } from 'vue';
import UI from '@ll_lib/ui';
import '@ll_lib/ui/style.css';
const app = createApp(App);
app.use(UI);
// Additionally, add the following configuration to tsconfig.json for type hints:
// "types": ["@ll_lib/ui/global.d.ts"]

// Import on demand
import { Button } from '@ll_lib/ui';
import '@ll_lib/ui/style.css';
const app = createApp(App);
app.use(Button);
```

### Utility Functions

```ts
import { isString } from '@ll_lib/utils';
console.log(isString('hello')); // true
```

### Hooks

```ts
import { useCounter } from '@ll_lib/hooks';
const { count, increment, decrement } = useCounter();
```

### Directives

```ts
import { vFocus } from '@ll_lib/directives';
// Global import
app.directive('focus', vFocus);

// Import on demand
import { vFocus } from '@ll_lib/directives';
app.directive('focus', vFocus);
```
