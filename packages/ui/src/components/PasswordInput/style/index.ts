import { c, mountStyle } from '~/_utils';

export const styleFn = () => {
  mountStyle(
    '-ll-password-input',
    c([
      c(
        '.no-autofill-pwd',
        `
      -webkit-text-security: disc !important;
    `,
      ),
      c(
        '.no-auto2',
        `
    -webkit-text-security: none !important;
    `,
      ),
    ]),
  );
};
