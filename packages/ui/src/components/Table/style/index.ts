import { mountStyle, asMultipleClass, c, cB } from '~/_utils';

export const styleFn = () => {
  mountStyle(
    '-ll-table',
    c(
      '.ll-table',
      `
      height: 100%;
      display: flex;
      flex-direction: column;
    `,
      [
        c(
          '.ll-table-container',
          `
      flex: 1;
      overflow-y: hidden;
      display: flex;
      flex-direction: column;
    `,
        ),
        cB(
          'table-wrapper',
          `
      flex: 1;
      overflow-y: hidden;
    `,
          [
            cB(
              'table-filter-trigger',
              `
        margin-inline: 4px -6px;
      `,
            ),
          ],
        ),
        cB(
          'divider-vertical',
          `
      height: 1.5rem;
      `,
        ),
        c(
          '.ll-tool-bar',
          `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
    `,
        ),
        c(
          '.ll-tool-bar-title',
          `
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 16px;
      font-weight: 500;
    `,
        ),
        c(
          '.ll-tool-bar-help',
          `
    padding-top: 3px;
      margin-left: 6px;
    `,
        ),
        c(
          '.ll-action-list',
          `
      display: flex;
    `,
          [
            cB(
              'btn',
              `
      padding-right: 12px;
      padding-left: 0;
      `,
              [c('&:last-child', `padding-right: 0;`)],
            ),
          ],
        ),
        c(
          '.ll-table-form-border',
          `
      border-bottom: 1px solid var(--ll-second-level-border-color);
    `,
        ),
        c(
          '.has-margin-bottom',
          `
      margin-bottom: var(--ll-margin-medium);
    `,
        ),
        c(
          '.ll-table-action-btn',
          `
      padding: 6px;
    `,
        ),
        //     c(
        //       '.ll-table-action-dropdown-btn',
        //       `
        //   vertical-align: super;
        // `,
        //     ),
        cB(
          'table-selection-column',
          `
    overflow: hidden;
    `,
        ),
        cB('table-wrapper', [
          c(
            'table',
            `
        border-radius: 0;
      `,
          ),
          cB(
            'table',
            `
        flex: 1;
        overflow-y: hidden;
        border-radius: 0;
      `,
          ),
          cB(
            'table-container',
            `
        height: 100%;
        display: flex;
        flex-direction: column;
        border-start-start-radius: 0;
        border-start-end-radius: 0;
      `,
            [
              c(
                'table>thead>tr:first-child >*:first-child',
                `
          border-start-start-radius: 0;
        `,
              ),
              cB(
                'table-header',
                `
          min-height: 44px;
          border-radius: 0;
        `,
              ),
              cB(
                'table-body',
                `
          flex: 1;
          overflow-y: hidden;
          max-height: 100% !important;
          min-height: 44px;
        `,
                [
                  cB(
                    'table-placeholder',
                    `
            height: 100%;
          `,
                    [
                      c(
                        'td',
                        `
            border-bottom: 0 !important;
            `,
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
          cB('table-thead', [
            c('>tr>th', {
              fontWeight: 400,
            }),
          ]),
          asMultipleClass(
            ['table-pagination', 'pagination'],
            `
       margin: 12px 0 0 0;
      `,
          ),
        ]),
        cB('pagination', [
          cB(
            'pagination-options-quick-jumper',
            `
        line-height: 30px;
      `,
            [c('&>input', `height: 30px`)],
          ),
          c('li', `height: 30px !important;`, [c('a', `line-height: 30px !important;`)]),
          c('input', `height: 30px !important;`),
          cB(
            'select-selector',
            `
        height: 30px;
        line-height: 30px;
      `,
          ),
          cB(
            'select-selection-item',
            `
        line-height: 30px;
      `,
          ),
          cB('pagination-total-text', `line-height: 30px;`),
        ]),
        cB(
          'table-body',
          `
      border-bottom: 1px solid var(--ll-second-level-border-color) !important;
    `,
          [
            c(
              '.drag-target',
              `
      
      background-color: #f2f3f4;
      `,
              [
                cB('table-cell-fix-right', `background-color: #f2f3f4;`),
                cB('table-cell-fix-left', `background-color: #f2f3f4;`),
              ],
            ),
            c(
              '.table-drag-icon',
              `
          cursor: grab;
          display: inline-block;
          padding: 3px;
          border-radius: 3px;
          `,
            ),
            // c('.table-drag-icon:hover', `background-color: #e6f4ff;`),
            c('.table-drag-icon:active', `cursor: grabbing;`),
          ],
        ),
      ],
    ),
  );
};
