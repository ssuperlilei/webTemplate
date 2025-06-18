# Vue3 组件属性（Props）辅助工具详解

> 本文介绍一套高效、类型安全的 Vue3 组件属性（props）辅助工具，帮助你用更少的代码实现更强大的属性定义，提升开发效率，减少包体积。

## 目录

- [引言](#引言)
- [核心工具函数与用法](#核心工具函数与用法)
  - [unknownProp](#unknownprop)
  - [numericProp](#numericprop)
  - [truthProp / lieProp](#truthprop--lieprop)
  - [makeRequiredProp](#makerequiredprop)
  - [makeNumericProp / makeStringProp / makeNumberProp](#makenumericprop--makestringprop--makenumberprop)
  - [makeArrayProp / makeObjectProp / makeFuncProp](#makearrayprop--makeobjectprop--makefuncprop)
  - [makeUniteProp](#makeuniteprop)
- [实际用例](#实际用例)
- [最佳实践与建议](#最佳实践与建议)
- [常见问题与对比](#常见问题与对比)
- [总结](#总结)

## 引言

在 Vue3 组件开发中，合理定义 props 能提升组件的健壮性和可维护性。手写 props 类型繁琐且易出错，本工具集通过类型推导和工厂函数，极大简化了 props 的声明方式。

---

## 核心工具函数与用法

### unknownProp

```ts
export const unknownProp = null as unknown as PropType<unknown>;
```

**用途**：用于声明类型未知的 prop，适合兜底场景。

---

### numericProp

```ts
export const numericProp = [Number, String];
```

**用途**：允许 prop 同时接受数字和字符串，常用于宽高、padding 等场景。

---

### truthProp / lieProp

```ts
export const truthProp = { type: Boolean, default: true as const };
export const lieProp = { type: Boolean, default: false as const };
```

**用途**：快速声明布尔型 prop，分别默认 true/false。

**示例**：

```ts
props: {
  visible: truthProp, // 默认 true
  disabled: lieProp   // 默认 false
}
```

---

### makeRequiredProp

```ts
export const makeRequiredProp = <T>(type: T) => ({ type, required: true as const });
```

**用途**：声明必填 prop，自动推断类型。

**示例**：

```ts
props: {
  label: makeRequiredProp(String);
}
```

---

### makeNumericProp / makeStringProp / makeNumberProp

```ts
export const makeNumericProp = <T>(defVal: T) => ({ type: numericProp, default: defVal });
export const makeStringProp = <T>(defVal: T) => ({
  type: String as unknown as PropType<T>,
  default: defVal,
});
export const makeNumberProp = <T>(defVal: T) => ({
  type: Number as unknown as PropType<T>,
  default: defVal,
});
```

**用途**：快速声明带默认值的数字/字符串/数字或字符串类型 prop。

**示例**：

```ts
props: {
  size: makeNumericProp('small'),
  title: makeStringProp('标题'),
  count: makeNumberProp(0)
}
```

---

### makeArrayProp / makeObjectProp / makeFuncProp

```ts
export const makeArrayProp = <T>(defVal: T[]) => ({
  type: Array as PropType<T[]>,
  default: () => defVal,
});
export const makeObjectProp = <T>(defVal: T) => ({
  type: Object as PropType<T>,
  default: () => defVal,
});
export const makeFuncProp = <T>(defVal: T) => ({ type: Function as PropType<T>, default: defVal });
```

**用途**：声明数组、对象、函数类型 prop，默认值用工厂函数返回，避免引用类型共享。

**示例**：

```ts
props: {
  list: makeArrayProp<string>([]),
  config: makeObjectProp({}),
  onClick: makeFuncProp(() => {})
}
```

---

### makeUniteProp

```ts
export const makeUniteProp = <T, V>(type: T[], defVal: V) => ({ type, default: () => defVal });
```

**用途**：声明联合类型 prop，适合枚举值场景。

**示例**：

```ts
props: {
  status: makeUniteProp(['success', 'error', 'info'], 'info');
}
```

---

## 实际用例

```ts
export const props = {
  prop1: makeRequiredProp(String),
  prop2: makeArrayProp<string>(['a', 'b', 'c']),
  prop3: makeArrayProp<Record<string, unknown>>([]),
};

export type Props = ExtractPropTypes<typeof props>;
```

## 最佳实践与建议

- 优先使用工厂函数声明 props，减少样板代码。
- 引用类型（Array/Object）默认值必须用函数返回，避免数据污染。
- 合理利用类型推断，提升类型安全。
- 对于布尔、枚举、必填等常见场景，优先用 truthProp、lieProp、makeUniteProp、makeRequiredProp。
- 复杂类型建议单独定义类型，增强可读性。

## 常见问题与对比

- **手写 props 对比**：手写 props 易遗漏类型、required、default，且冗长。
- **工厂函数优势**：统一风格、类型安全、易维护。
- **错误用法**：引用类型默认值直接赋值会导致所有组件实例共享同一份数据。

## 总结

本工具集极大简化了 Vue3 组件属性声明，提升了开发效率和代码健壮性。建议在团队项目中推广使用，结合类型系统和最佳实践，打造高质量组件库。

```ts
/**
 * 组件属性辅助
 * 🙌 能够使用更少的代码编写，有助于减少包体积
 */
import type { PropType } from 'vue';

export const unknownProp = null as unknown as PropType<unknown>;

export const numericProp = [Number, String];

export const truthProp = {
  type: Boolean,
  default: true as const,
};

export const lieProp = {
  type: Boolean,
  default: false as const,
};

export const makeRequiredProp = <T>(type: T) => {
  return { type, required: true as const };
};

export const makeNumericProp = <T>(defVal: T) => {
  return { type: numericProp, default: defVal };
};

export const makeStringProp = <T>(defVal: T) => {
  return { type: String as unknown as PropType<T>, default: defVal };
};

export const makeNumberProp = <T>(defVal: T) => {
  return { type: Number as unknown as PropType<T>, default: defVal };
};

export const makeArrayProp = <T>(defVal: T[]) => {
  return { type: Array as PropType<T[]>, default: () => defVal };
};

export const makeObjectProp = <T>(defVal: T) => {
  return { type: Object as PropType<T>, default: () => defVal };
};

export const makeFuncProp = <T>(defVal: T) => {
  return { type: Function as PropType<T>, default: defVal };
};

// 联和类型属性
export const makeUniteProp = <T, V>(type: T[], defVal: V) => {
  return { type, default: () => defVal };
};

import type { PropType, ExtractPropTypes } from 'vue';

export const props = {
  prop1: makeRequiredProp(String),
  prop2: makeArrayProp<string>(['a', 'b', 'c']),
  prop3: makeArrayProp<Record<string, unknown>[]>([]),
};

export type Props = ExtractPropTypes<typeof props>;
```
