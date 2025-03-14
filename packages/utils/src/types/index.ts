/**
 * ID 类型定义为字符串
 */
export type ID = string;

/**
 * 从数组中选择指定属性的类型
 * @template T
 * @template K
 */
export type PickFromArray<T, K extends Array<keyof T>> = {
  [P in K[number]]: T[P];
};

const toString = Object.prototype.toString;
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

/**
 * 判断对象类型的辅助函数
 * @template T
 * @param {string | string[]} type - 类型字符串或字符串数组
 * @returns {(obj: unknown) => obj is T}
 */
const isType =
  <T>(type: string | string[]) =>
  (obj: unknown): obj is T =>
    obj != null &&
    (Array.isArray(type) ? type : [type]).some((t) => getType(obj) === `[object ${t}]`);

/**
 * 获取对象类型
 * @param {any} obj - 目标对象
 * @returns {string}
 */
export const getType = (obj: any) => Object.prototype.toString.call(obj);

/**
 * 判断是否为函数
 */
export const isFn = isType<(...args: any[]) => any>([
  'Function',
  'AsyncFunction',
  'GeneratorFunction',
]);

/**
 * 判断是否为 Window 对象
 */
export const isWindow = isType<Window>('Window');

/**
 * 判断是否为 HTMLElement
 * @param {any} obj - 目标对象
 * @returns {obj is HTMLElement}
 */
export const isHTMLElement = (obj: any): obj is HTMLElement => {
  return obj?.['nodeName'] || obj?.['tagName'];
};

/**
 * 判断是否为数组
 */
export const isArray = Array.isArray;

/**
 * 判断是否为普通对象
 */
export const isPlainObj = isType<object>('Object');

/**
 * 判断是否为字符串
 */
export const isString = isType<string>('String');

/**
 * 判断是否为布尔值
 */
export const isBoolean = isType<boolean>('Boolean');

/**
 * 判断是否为数字
 */
export const isNumber = isType<number>('Number');

/**
 * 判断是否为对象
 * @param {unknown} val - 目标值
 * @returns {val is object}
 */
export const isObject = (val: unknown): val is object => {
  return Object.prototype.toString.call(val) === '[object Object]';
};

/**
 * 判断是否为正则表达式
 */
export const isRegExp = isType<RegExp>('RegExp');

/**
 * 判断值是否有效
 * @param {any} val - 目标值
 * @returns {boolean}
 */
export const isValid = (val: any) => val !== null && val !== undefined;

/**
 * 判断是否为有效数字
 * @param {any} val - 目标值
 * @returns {val is number}
 */
export const isValidNumber = (val: any): val is number => !isNaN(val) && isNumber(val);

/**
 * 判断值是否为指定类型
 * @param {unknown} val - 目标值
 * @param {string} type - 类型字符串
 * @returns {boolean}
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * 判断值是否已定义
 * @template T
 * @param {T} [val] - 目标值
 * @returns {val is T}
 */
export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

/**
 * 判断值是否未定义
 * @template T
 * @param {T} [val] - 目标值
 * @returns {val is T}
 */
export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

/**
 * 判断值是否为空
 * @template T
 * @param {T} val - 目标值
 * @returns {val is T}
 */
export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isPlainObj(val)) {
    return Object.keys(val).length === 0;
  }

  // 判断普通变量是否为空值
  if (val === null || val === undefined) {
    return true;
  }
  if (is(val, 'Number') && isNaN(val as number)) {
    return true;
  }

  return false;
}

/**
 * 判断是否为日期对象
 * @param {unknown} val - 目标值
 * @returns {val is Date}
 */
export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}

/**
 * 判断是否为 null
 * @param {unknown} val - 目标值
 * @returns {val is null}
 */
export function isNull(val: unknown): val is null {
  return val === null;
}

/**
 * 判断是否为 null 且未定义
 * @param {unknown} val - 目标值
 * @returns {val is null | undefined}
 */
export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val);
}

/**
 * 判断是否为 null 或未定义
 * @param {unknown} val - 目标值
 * @returns {val is null | undefined}
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

/**
 * 判断是否为 Promise 对象
 * @template T
 * @param {unknown} val - 目标值
 * @returns {val is Promise<T>}
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (
    is(val, 'Promise') &&
    val instanceof Promise &&
    [val.then, val.catch, val.finally].every(isFunction)
  );
}

/**
 * 判断是否为函数
 * @param {unknown} val - 目标值
 * @returns {val is Function}
 */
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

/**
 * 判断是否为异步函数
 * @param {unknown} val - 目标值
 * @returns {val is Function}
 */
export function isAsyncFunction(val: unknown): val is Function {
  return val instanceof AsyncFunction;
}

/**
 * 判断是否为元素节点
 * @param {unknown} val - 目标值
 * @returns {val is Element}
 */
export function isElement(val: unknown): val is Element {
  return isObject(val) && !!(val as Element).tagName;
}

/**
 * 判断是否为 Map 对象
 * @param {unknown} val - 目标值
 * @returns {val is Map<any, any>}
 */
export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map');
}

/**
 * 判断是否为服务端环境
 */
export const isServer = typeof window === 'undefined';

/**
 * 判断是否为客户端环境
 */
export const isClient = !isServer;

/**
 * 判断是否为 URL
 * @param {string} path - 目标路径
 * @returns {boolean}
 */
export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}

/**
 * 判断是否为对象或数组
 * @param {any} value - 目标值
 * @returns {boolean}
 */
export function isObjectOrArray(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Object]' || Array.isArray(value);
}

/**
 * 判断是否为 undefined
 * @param {unknown} target - 目标值
 * @returns {target is undefined}
 */
export function isUndefined(target: unknown): target is undefined {
  return typeof target === 'undefined';
}
