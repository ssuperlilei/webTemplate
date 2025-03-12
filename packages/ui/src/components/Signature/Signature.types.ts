import type LSignature from './Signature.vue';

export interface SignatureProps {
  lineWidth?: number;
  lineColor?: string;
  backgroundColor?: string;
  disabled?: boolean;
}

export interface SignatureEmits {
  (e: 'save', data: string): void;
  (e: 'clear'): void;
  (e: 'start-drawing'): void;
  (e: 'end-drawing'): void;
  (e: 'change', isEmpty: boolean): void;
}

export type LSignatureInstance = Partial<InstanceType<typeof LSignature>>;
