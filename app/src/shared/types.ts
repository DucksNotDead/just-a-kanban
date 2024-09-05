import { BoundingBox } from 'framer-motion';

export interface IModalRef {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export interface IReorderProps<T> {
  setter: (value: T[]) => void;
  active?: boolean;
  axis?: 'x' | 'y';
  constraints?: Partial<BoundingBox>;
}