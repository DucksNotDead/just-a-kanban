import { appTransitions } from 'shared/const';

export const taskDetailTransitionConfig = {
  todosMotionProps: {
    variants: {
      visible: { ...appTransitions.fade.variants.visible, height: 'auto' },
      hidden: { ...appTransitions.fade.variants.hidden, height: 0 },
    },
    initial: 'hidden',
    exit: 'hidden',
    animate: 'visible'
  }
} as const