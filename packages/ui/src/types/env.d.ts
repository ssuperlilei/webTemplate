import type { EmitsOptions, SetupContext } from 'vue';
declare module '*.vue' {
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

declare global {
  interface PromiseFn<T = unknown, R = T> {
    (...arg: T[]): Promise<R>;
  }

  type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
    k: infer I,
  ) => void
    ? I
    : never;

  type Recordable<T = unknown> = Record<string, T>;

  type Key = string | number;

  type EmitFn<E = EmitsOptions> = SetupContext<E>['emit'];

  interface Fn<T = unknown, R = T> {
    (...arg: T[]): R;
  }
  enum LogoBackgroundMode {
    // 白色
    WHITE,
    // 蓝色
    BLUE,
  }
}
