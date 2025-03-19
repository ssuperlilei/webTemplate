import { c, cB, cE, mountStyle } from '~/_utils';

// 基础扩展组件样式
export const expandComponentsStyle = (prefix: string) => {
  const modalBasicStyle = [
    cB(
      'modal-header',
      {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 'var(--ll-padding-small)',
        marginBottom: '0',
        borderBottom: '1px solid #e4e4e4',
        height: '44px',
      },
      [
        cB(
          'modal-title',
          {
            width: '100%',
            height: '100%',
          },
          [
            c('.l-modal-title', {
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              cursor: 'move',
              userSelect: 'none',
            }),
            c('.l-modal-title-no-drag', {
              height: '100%',
              display: 'flex',
              alignItems: 'center',
            }),
          ],
        ),
      ],
    ),
    cB('modal-footer', {
      marginInlineStart: '0px',
      marginTop: '0px ',
    }),
    cB('modal-footer', [
      cB('btn-default', {
        marginRight: '8px',
        marginBottom: '16px',
      }),
      cB('btn-primary', {
        marginBottom: '16px',
        marginRight: '16px',
      }),
    ]),
    cB('modal-close', {
      top: '13px',
      textAlign: 'center',
    }),
    cB('modal-close:hover', {
      backgroundColor: '#FF5633',
      color: '#ffffff',
    }),
  ];
  mountStyle(
    '-ll-config-provider-common',
    c([
      // 多选树
      cB('tree', [
        cE('checkbox', {
          marginBlockStart: '0',
        }),
        cE('switcher', {
          marginRight: '-4px',
        }),
        cE('treenode', {
          width: '100%',
        }),
        cE('treenode-switcher-open:hover', {
          backgroundColor: '#F2F3F4',
        }),
        cE('treenode-switcher-close:hover', {
          backgroundColor: '#F2F3F4',
        }),
        cE('node-content-wrapper-normal', {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }),
        cE('indent-unit', {
          width: '20px',
        }),
      ]),

      cB('tree', {
        width: '400px',
        borderRadius: '0',
      }),
      // 展示树
      c(
        '.displayTree',
        {
          width: '400px',
          color: 'var(--ll-third-level-text-color)',
        },
        [
          cB('tree-treenode-selected', {
            color: 'var(--ll-primary-color)',
            backgroundColor: 'var(--ll-primary-color-background)',
          }),
          cB('tree-treenode-selected:hover', {
            backgroundColor: 'var(--ll-primary-color-background)',
          }),
        ],
      ),
      //表格
      cB('table-wrapper', [
        cB('table-tbody', [
          c('tr', [
            c(
              'td',
              `
            padding: 0;
            height: 44px;
            padding-left: var(--ll-padding-small);
            padding-right: var(--ll-padding-small);
          `,
            ),
          ]),
        ]),
      ]),
      cB('table', [
        cE(
          'thead',
          ` 
     height: 44px;
     `,
        ),
        cE('selection-column', {
          width: '44px',
        }),
        cE('row-level-0', {
          boxSizing: 'border-box',
        }),
        cE('cell', [
          cB('table-selection-column', {
            width: '44px',
          }),
        ]),
        cE('cell:last-child', {
          minWidth: '100px',
          maxWidth: '470px',
        }),
      ]),
      // 弹出框 M号
      c('.modalSizeMedium', [
        cB('modal-content', {
          padding: '0',
          maxHeight: 'calc(100vh - 150px)',
        }),
        cB('modal-body', {
          margin: '16px',
          overflowY: 'scroll',
          overflow: 'auto',
          overflowX: 'hidden',
          maxHeight: 'calc(100vh - 150px - 128px)',
        }),
        ...modalBasicStyle,
      ]),
      // 弹出框 L号
      c('.modalSizeLarge', [
        cB('modal-content', {
          padding: '0',
          maxHeight: 'calc(100vh - 150px)',
        }),
        cB('modal-body', {
          margin: '16px',
          overflowY: 'scroll',
          overflow: 'auto',
          overflowX: 'hidden',
          maxHeight: 'calc(100vh - 150px - 128px)',
        }),
        ...modalBasicStyle,
      ]),
      // 弹出框 XL号
      c('.modalSizeExtraLarge', [
        cB('modal-content', {
          padding: '0',
          maxHeight: 'calc(100vh - 120px - 60px)',
        }),
        cB('modal-body', {
          margin: '16px',
          overflowY: 'scroll',
          overflow: 'auto',
          overflowX: 'hidden',
          maxHeight: 'calc(100vh - 120px - 60px - 128px)',
        }),
        ...modalBasicStyle,
      ]),
      // 弹出框 全屏
      c('.full-modal', [
        cB(
          'modal',
          `
          max-width: 100%;
          top: 0;
          padding-bottom: 0;
          margin: 0;
        `,
        ),
        cB('modal-content', {
          width: '100%',
          padding: '0',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }),
        cB(
          'modal-body',
          {
            margin: '16px',
            overflow: 'hidden',
            flex: '1',
          },
          [
            cB(
              'form',
              `
          height: 100%
        `,
            ),
          ],
        ),
        ...modalBasicStyle,
      ]),
      //表单
      cB('form', [
        cE('item-no-colon', {
          marginRight: '6px',
        }),
        cE('item-explain-error', {
          fontSize: '12px',
        }),
      ]),
    ]),
    prefix,
  );
};
