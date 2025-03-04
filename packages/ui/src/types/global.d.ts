// // For this project development
// import 'vue';

/**
 * 用作给全局引入的UI组件类型提示：
 * tsconfig.json 需要添加配置："types": ["@ssuperlilei/ui/global.d.ts"]
 *
 * 或者
 * 一个全局的类型声明文件.d.ts写入：/// <reference types="@ssuperlilei/ui/global.d.ts" />
 * 类似于：/// <reference types="vite/client" /> 具体可参考playground下的env.d.ts
 */
declare module 'vue' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    VButton: (typeof import('@ssuperlilei/ui'))['VButton'];
    VDialog: (typeof import('@ssuperlilei/ui'))['VDialog'];
    LConfigProvider: (typeof import('@ssuperlilei/ui'))['LConfigProvider'];
    LPasswordInput: (typeof import('@ssuperlilei/ui'))['LPasswordInput'];
    LForm: (typeof import('@ssuperlilei/ui'))['LForm'];
    LEllipsis: (typeof import('@ssuperlilei/ui'))['LEllipsis'];
    LTable: (typeof import('@ssuperlilei/ui'))['LTable'];
  }
}

export {};
