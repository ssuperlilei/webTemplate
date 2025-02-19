import { c, mountStyle } from '~/_utils';

export const commonStyle = (prefix: string) => {
  mountStyle(
    '-ll-config-provider',
    c([
      c(
        'html',
        `
    height: 100%;
    `,
      ),
      c(
        '*',
        `
      box-sizing: border-box;
      margin: 0;
      font-weight: normal;
    `,
      ),
      c(
        '*::before',
        `
      box-sizing: border-box;
      margin: 0;
      font-weight: normal;
    `,
      ),
      c(
        '*::after',
        `
      box-sizing: border-box;
        margin: 0;
        font-weight: normal;
      `,
      ),
      c(
        'body',
        `
      margin: 0;
      padding: 0;
      min-height: 100%;
      height: 100%;
      font-size: 14px;
      font-family:"思源黑体","Microsoft YaHei" !important;
      line-height: 1.4;
      overflow: hidden;
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: transparent;
    
      --ll-primary-color: #2871FF;
      --ll-primary-color-white: #ffffff;
      --ll-primary-color-background: #EBF1FF;
      --ll-primary-color-tab: #D9E5FF;
      --ll-primary-color-hover: #5991FF;
      --ll-primary-color-active: #2260D9;
    
      --ll-primary-color-menu: #103566;
      --ll-primary-color-menu-level-2: #0D2F59;
    
      --ll-success-color: #59BF78;
      --ll-success-color-light-background: #EAF9F4;
      --ll-success-color-stroke: #BDE5C9;
      --ll-success-color-stroke-hover: #8BD2A1;
      --ll-success-color-hover: #72C98C;
      --ll-success-color-active: #52B06E;
    
      --ll-warning-color: #FF9A2F;
      --ll-warning-color-light-background: #FFECD8;
      --ll-warning-color-stroke: #FFD7AC;
      --ll-warning-color-stroke-hover: #FFB86D;
      --ll-warning-color-hover: #FFA94E;
      --ll-warning-color-active: #EB8E2B;
    
      --ll-danger-color: #FF5633;
      --ll-danger-color-light-background: #FFD7CF;
      --ll-danger-color-stroke: #FFBBAD;
      --ll-danger-color-stroke-hover: #FF8970;
      --ll-danger-color-hover: #FF6F52;
      --ll-danger-color-active: #EB4F2F;
  
      --ll-limit-color: #574EFA;
  
      --ll-purple-color: #574EFA;
      --ll-confirm-color: #00BFFF;
  
      --ll-first-level-text-color: #18191A;
      --ll-second-level-text-color: #242526;
      --ll-third-level-text-color: #606266;
      --ll-fourth-level-text-color: #909398;
      --ll-fifth-level-text-color: #C1C4CB;
      --ll-first-level-border-color: #D4D7D9;
      --ll-second-level-border-color: #E1E3E5;
    
      --ll-background-color: #F5F7FA;
      --ll-disable-color: #F2F3F4;
      --ll-table-td-color: #FAFAFA;
    
      --ll-title-font-size: 20px;
      --ll-page-title-font-size: 18px;
      --ll-bold-title-font-size: 16px;
      --ll-bold-title-font-weight: medium;
      --ll-module-title-font-size: 16px;
      --ll-primary-font-size: 14px;
      --ll-primary-font-weight: medium;
      --ll-font-size: 14px;
      --ll-description-font-size: 12px;
    
      --ll-padding-mini: 12px;
      --ll-padding-small: 16px;
      --ll-padding-medium: 20px;
      --ll-padding-large: 24px;
    
      --ll-margin-small: 8px;
      --ll-margin-medium: 12px;
      --ll-margin-large: 16px;
    
      --ll-module-margin-small: 16px;
      --ll-module-margin-medium: 24px;
      --ll-module-margin-large: 32px;
    `,
        [
          c(
            'input',
            `
        font-family: inherit;
        font-size: inherit;
      `,
          ),
        ],
      ),
    ]),
    prefix,
  );
};
