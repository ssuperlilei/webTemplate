import i18next, { InitOptions } from 'i18next';
import { I18nLanguageEnum, I18nLanguageType } from './i18n.types';
import local from './locale';

// 默认值
const DEFAULT_LNG = I18nLanguageEnum.ZH_CN;

// 创建一个I18n类，用于封装i18nNext的初始化和配置
class I18n {
  private static instance: I18n;
  private options: InitOptions = {};
  private readonly logger: Console;

  private constructor(options: InitOptions) {
    this.options = {
      lng: DEFAULT_LNG,
      defaultNS: 'translation',
      resources: {
        zh_CN: {
          translation: local.zh_CN,
        },
        en_US: {
          translation: local.en_US,
        },
      },
      ...options,
    };
    this.logger = options.debug
      ? console
      : ({ error: () => {}, warn: () => {}, log: () => {} } as Console);
    this.init();
  }

  // 获取单例实例
  public static getInstance(options?: InitOptions): I18n {
    if (!I18n.instance) {
      I18n.instance = new I18n(options || {});
    } else if (options) {
      options.lng && I18n.instance.changeLanguage(options.lng as I18nLanguageType);
      if (options.resources) {
        Object.keys(options.resources).forEach((lng) => {
          I18n.instance.setResources(
            lng as I18nLanguageType,
            options.resources?.[lng] as Record<string, any>,
          );
        });
      }
    }
    return I18n.instance;
  }

  // 初始化i18nNext
  private init() {
    i18next.init(this.options);
  }

  /**
   * 获取当前语言
   * @returns {I18nLanguageType} 当前语言标识
   */
  public getLanguage(): I18nLanguageType {
    return (i18next.language || DEFAULT_LNG) as I18nLanguageType;
  }

  /**
   * 切换语言
   * @param {I18nLanguageType} lng 目标语言
   */
  public changeLanguage(lng: I18nLanguageType): void {
    i18next.changeLanguage(lng || DEFAULT_LNG);
  }

  /**
   * 设置资源
   * @param {I18nLanguageType} lng 语言标识
   * @param {Record<string, any>} resources 资源对象
   */
  public setResources(lng: I18nLanguageType, resources: Record<string, any>): void {
    i18next.addResourceBundle(lng, 'translation', resources, true, true);
  }

  /**
   * 获取资源
   * @param {I18nLanguageType} lng 语言标识
   * @returns {Record<string, any>} 资源对象
   */
  public getResources(lng: I18nLanguageType): Record<string, any> {
    return i18next.getResourceBundle(lng, 'translation');
  }

  /**
   * 翻译文本
   * @param {string} key 翻译键
   * @param {Record<string, any>} [options] 翻译选项，支持插值
   * @returns {string} 翻译后的文本
   */
  public t(key: string, options?: Record<string, any>): string {
    if (!key) return '';
    if (!i18next.exists(key) && i18next.language) {
      const obj = i18next.getResourceBundle(i18next.language, 'translation');
      if (obj && obj[key]) {
        return obj[key];
      }
      this.logger.warn(`[i18n] Key not found: ${key}`);
    }
    return (i18next.t(key, options) || key) as string;
  }

  /**
   * 批量翻译文本
   * @param {string[]} keys 翻译键数组
   * @param {Record<string, any>} [options] 翻译选项
   * @returns {Record<string, string>} 键值对形式的翻译结果
   */
  public tBatch(keys: string[], options?: Record<string, any>): Record<string, string> {
    const result: Record<string, string> = {};
    if (!keys || !keys.length) return result;

    keys.forEach((key) => {
      result[key] = this.t(key, options);
    });
    return result;
  }

  /**
   * 特殊翻译文本，如果不存在则返回false
   * @param {string} key 翻译键
   * @param {Record<string, any>} [options] 翻译选项，支持插值
   * @returns {string | boolean} 翻译后的文本，键不存在时返回false
   */
  public customizeT(key: string, options?: Record<string, any>): string | boolean {
    if (!key) return false;
    if (i18next.exists(key)) {
      return i18next.t(key, options) as string;
    } else if (i18next.language) {
      const obj = i18next.getResourceBundle(i18next.language, 'translation');
      if (obj && obj[key]) {
        return obj[key];
      }
    }
    this.logger.warn(`[i18n] Key not found: ${key}`);
    return false;
  }

  /**
   * 带插值的翻译
   * @param {string} key 翻译键
   * @param {Record<string, any>} interpolation 插值参数
   * @returns {string} 翻译后的文本
   */
  public tWithInterpolation(key: string, interpolation: Record<string, any>): string {
    return this.t(key, { interpolation });
  }
}

/**
 * 初始化i18n
 * @param {InitOptions} options i18n初始化配置
 * @example
 * import { init } from '@ssuperlilei/i18n';
 * init({ lng: 'zh_CN', debug: true });
 */
export const init = (options: InitOptions): void => {
  I18n.getInstance(options);
};

/**
 * 切换语言
 * @param {I18nLanguageType} lng 目标语言
 * @example
 * import { changeLanguage } from '@ssuperlilei/i18n';
 * changeLanguage('en_US');
 */
export const changeLanguage = (lng: I18nLanguageType): void => {
  I18n.getInstance().changeLanguage(lng);
};

/**
 * 翻译文本
 * @param {string} key 翻译键
 * @param {Record<string, any>} [options] 翻译选项，支持插值
 * @returns {string} 翻译后的文本
 * @example
 * import { t } from '@ssuperlilei/i18n';
 * const message = t('please input');
 */
export const t = (key: string, options?: Record<string, any>): string => {
  return I18n.getInstance().t(key, options);
};

/**
 * 批量翻译文本
 * @param {string[]} keys 翻译键数组
 * @param {Record<string, any>} [options] 翻译选项
 * @returns {Record<string, string>} 键值对形式的翻译结果
 * @example
 * import { tBatch } from '@ssuperlilei/i18n';
 * const translations = tBatch(['submit', 'cancel']);
 * // 结果: { submit: '提交', cancel: '取消' }
 */
export const tBatch = (keys: string[], options?: Record<string, any>): Record<string, string> => {
  return I18n.getInstance().tBatch(keys, options);
};

/**
 * 特殊翻译文本
 * @param {string} key 翻译键
 * @param {Record<string, any>} [options] 翻译选项，支持插值
 * @returns {string | boolean} 翻译后的文本，键不存在时返回false
 */
export const customizeT = (key: string, options?: Record<string, any>): string | boolean => {
  return I18n.getInstance().customizeT(key, options);
};

/**
 * 带插值的翻译
 * @param {string} key 翻译键
 * @param {Record<string, any>} interpolation 插值参数
 * @returns {string} 翻译后的文本
 * @example
 * import { tWithInterpolation } from '@ssuperlilei/i18n';
 * const message = tWithInterpolation('welcome', { name: 'John' });
 */
export const tWithInterpolation = (key: string, interpolation: Record<string, any>): string => {
  return I18n.getInstance().tWithInterpolation(key, interpolation);
};

/**
 * 获取当前语言
 * @returns {I18nLanguageType} 当前语言标识
 * @example
 * import { getLanguage } from '@ssuperlilei/i18n';
 * const currentLang = getLanguage(); // 'zh_CN'
 */
export const getLanguage = (): I18nLanguageType => {
  return I18n.getInstance().getLanguage();
};

export { version } from './version';
// 导出所有的类型
export * from './i18n.types';

export type { I18nLanguageEnum } from './i18n.types';
