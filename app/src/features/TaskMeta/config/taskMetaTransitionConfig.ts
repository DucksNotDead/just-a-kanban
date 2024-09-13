import { appTransitions } from 'shared/const';

export const taskMetaTransitionConfig = {
  editConditionMotionProps: {
    layout: 'size',
    variants: {
      visible: { ...appTransitions.fade.variants.visible, height: 'auto', marginBottom: 12 },
      hidden: { ...appTransitions.fade.variants.hidden, height: 0, marginBottom: 0 },
    },
    initial: 'hidden',
    exit: 'hidden',
    animate: 'visible',
  },
} as const;
