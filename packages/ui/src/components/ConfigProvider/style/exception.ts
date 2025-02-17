import { asBrother, c, cB } from '../../../utils/cssr';

export default c([
  cB('modal-body', [
    cB('form', [
      c(
        '.from-col',
        `
          padding-right: 16px !important;
        `,
      ),
      asBrother('form-vertical', undefined, [
        c(
          '.from-col',
          `
        padding-right: 8px !important;
      `,
        ),
      ]),
    ]),
  ]),
  c('.ll-form', [
    asBrother('form-vertical', undefined, [
      c(
        '.from-col',
        `
      padding-right: 0 !important;
    `,
      ),
    ]),
  ]),
  c(
    '.ll-table-dropdown-btn',
    `
      padding: 0;
      line-height: 1;
      height: fit-content;
    `,
  ),
]);
