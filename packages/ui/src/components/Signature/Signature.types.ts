import type LSignature from './Signature.vue';

export interface SignatureProps {
  lineWidth?: number;
  lineColor?: string;
  backgroundColor?: string;
  quality?: number;
  disabled?: boolean;
  enableHistory?: boolean; // 是否启用历史功能
}

export interface SignatureEmits {
  (e: 'confirm', data: string): void;
  (e: 'clear'): void;
  (e: 'start'): void;
  (e: 'end'): void;
  (e: 'signing', isEmpty: boolean): void;
  (e: 'historyChange', canUndo: boolean, canRedo: boolean): void; // 历史状态改变事件
}

export type LSignatureInstance = Partial<InstanceType<typeof LSignature>>;
