// // For this project development
// import 'vue';

/**
 * 用作给全局引入的UI组件类型提示：
 * tsconfig.json 需要添加配置："types": ["@ll_lib/ui/global.d.ts"]
 *
 * 或者
 * 一个全局的类型声明文件.d.ts写入：/// <reference types="@ll_lib/ui/global.d.ts" />
 * 类似于：/// <reference types="vite/client" /> 具体可参考playground下的env.d.ts
 */
declare module 'vue' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    VButton: (typeof import('@ll_lib/ui'))['VButton'];
    VDialog: (typeof import('@ll_lib/ui'))['VDialog'];
    LConfigProvider: (typeof import('@ll_lib/ui'))['LConfigProvider'];
    LPasswordInput: (typeof import('@ll_lib/ui'))['LPasswordInput'];
    LForm: (typeof import('@ll_lib/ui'))['LForm'];
    LEllipsis: (typeof import('@ll_lib/ui'))['LEllipsis'];
  }
}

export {};
