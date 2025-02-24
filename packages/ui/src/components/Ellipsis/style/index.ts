import { asMultiplePrefixClass, c, cB, mountStyle } from '~/_utils';
export const styleFn = () => {
  mountStyle(
    '-ll-ellipsis',
    c([
      c(
        '.ll-ellipsis-container',
        `
      display:inline-flex;
      align-items: center;
      max-width: 100%;
    `,
      ),
      c(
        '.ll-ellipsis-span',
        `
        display: inline-block;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        `,
      ),
      c(
        '.ll-double-ellipsis-span',
        `
      line-height: 24px;
      white-space: normal;
      word-break: break-all;
      display:-webkit-box; 
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
      `,
      ),
      asMultiplePrefixClass(
        [
          {
            hasPrefix: false,
            name: '.ll-tooltip-ellipsis',
          },
          {
            hasPrefix: true,
            name: 'tooltip-placement-bottom',
          },
        ],
        `
      padding-top: 0;
      `,
      ),
      c(
        '.ll-tooltip-ellipsis',
        `
      padding-top: 0;
        `,
        [
          cB(
            'tooltip-arrow',
            `
        display: none;
        `,
          ),
          cB(
            'tooltip-inner',
            `
        padding: 4px 8px;
        font-size: 12px;
        color: var(--ll-third-level-text-color);
        background-color: #FFFEFC;
        border-radius: 0;
        box-shadow: none;
        border: 1px solid var(--ll-first-level-border-color);
        `,
          ),
        ],
      ),
    ]),
  );
};
