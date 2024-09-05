import { appTransitions } from 'shared/const';

export const taskDetailTransitionConfig = {
  todosMotionProps: {
    variants: {
      visible: { ...appTransitions.fade.visible, height: 'auto' },
      hidden: { ...appTransitions.fade.hidden, height: 0 },
    },
    initial: 'hidden',
    exit: 'hidden',
    animate: 'visible'
  },
} as const