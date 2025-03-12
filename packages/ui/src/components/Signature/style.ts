import { c, mountStyle } from '~/_utils';
const styleFn = () => {
  mountStyle(
    '-ll-signature',
    c([
      c(
        '.ll-signature-container',
        `
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      overflow: hidden;
      width: 100%;
      height: 100%;
      position: relative;
      `,
      ),
      c(
        '.ll-signature-canvas',
        `
      border-bottom: 1px solid #dcdfe6;
      cursor: crosshair;
      touch-action: none;
      width: 100%;
      height: 100%;
      display: block;
      box-sizing: border-box;
      `,
      ),
    ]),
  );
};

export default styleFn;
