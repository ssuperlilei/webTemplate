import { isPlainObj } from '../types';

/**
 * @description 函数节流
 * @param fn 要执行的函数
 * @param wait 延迟时间
 * @param immediate 是否立即执行
 * @returns {Function}
 */
export function throttle<T extends Function>(fn: T, wait = 300, immediate = false): T {
  let timer: any = null;
  let callNow = immediate;
  return function (this: any, ...args: any[]) {
    if (callNow) {
      fn.apply(this, args);
      callNow = false;
    }
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, wait);
    }
  } as any;
}

/**
 * @description 函数防抖
 * @param fn 要执行的函数
 * @param wait 延迟时间
 * @param immediate 是否立即执行
 * @returns {Function}
 */
export function debounce<T extends Function>(fn: T, wait = 80, immediate = false): T {
  let timer: any = null;
  return function (this: any, ...args: any[]) {
    const callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(this, args);
      }
    }, wait);
    if (callNow) {
      fn.apply(this, args);
    }
  } as any;
}

/**
 * @description 去除对象中的空值 null undefined, 包括嵌套对象
 * @param obj 要处理的对象
 * @returns {Object} 处理后的对象
 */

export function removeEmpty(obj: Record<string, any>): Record<string, any> {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      obj[key] !== null &&
      obj[key] !== undefined
    ) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj[key] !== null && obj[key] !== undefined) {
          if (isPlainObj(obj[key])) {
            newObj[key] = removeEmpty(obj[key]);
          } else {
            newObj[key] = obj[key];
          }
          newObj[key] = obj[key];
        }
      }
    }
  }
  return newObj;
}

export const once = (func: Function) => {
  let called = false;
  let result: any;
  return function (...args: any[]) {
    if (called) return result;
    called = true;
    // @ts-ignore
    result = func.call(this, ...args);
    return result;
  };
};

/* 
  @description: 复制文本到剪切板
  @param {string} text: 需要复制的文本
  @return {Promise<void>} 
*/
export const fallbackCopyTextToClipboard = async (text: string) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('value', text);

  input.style.top = '0';
  input.style.left = '0';
  input.style.position = 'fixed';
  // 设置index为999999，保证在最上层
  input.style.zIndex = '999999';

  document.body.appendChild(input);
  input.focus();
  input.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject();
  } finally {
    document.body.removeChild(input);
  }
};

/* 
  @description: 复制文本到剪切板
  @param {string} text: 需要复制的文本
  @return {Promise<void>}
*/
export const copyToClipboard = (text: string): Promise<void> => {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text);
  }
  return navigator.clipboard.writeText(text);
};
