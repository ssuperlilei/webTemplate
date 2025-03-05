import { asChild, c, cB, mountStyle } from '~/_utils';

export const styleFn = () => {
  mountStyle(
    '-ll-modal-from',
    c([
      c(
        'll-modal-form-trigger',
        `
        cursor: pointer;
      `,
      ),
      cB('modal-body', [
        cB('form', [
          asChild(
            'row',
            `
            justify-content: center;
          `,
          ),
        ]),
      ]),
    ]),
  );
};
