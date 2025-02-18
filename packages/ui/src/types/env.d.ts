import { EmitsOptions, SetupContext } from 'vue';
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare global {
  interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>;
  }

  type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I,
  ) => void
    ? I
    : never;

  type Recordable<T = any> = Record<string, T>;

  type Key = string | number;

  type EmitFn<E = EmitsOptions> = SetupContext<E>['emit'];

  interface Fn<T = any, R = T> {
    (...arg: T[]): R;
  }
  enum LogoBackgroundMode {
    // 白色
    WHITE,
    // 蓝色
    BLUE,
  }
}
