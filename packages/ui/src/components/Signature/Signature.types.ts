import type LSignature from './Signature.vue';

export interface SignatureProps {
  lineWidth?: number;
  lineColor?: string;
  backgroundColor?: string;
  quality?: number;
  disabled?: boolean;
}

export interface SignatureEmits {
  (e: 'confirm', data: string): void;
  (e: 'clear'): void;
  (e: 'start'): void;
  (e: 'end'): void;
  (e: 'signing', isEmpty: boolean): void;
}

export type LSignatureInstance = Partial<InstanceType<typeof LSignature>>;
