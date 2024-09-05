const duration = .2

export const todoTransitionConfig = {
  checkboxMotionProps: {
    variants: {
      enter: { opacity: 0, translateX: -16 },
      visible: { opacity: 1, translateX: 0 },
      exit: { opacity: 0, translateX: -16 },
    },
    initial: 'enter',
    animate: 'visible',
    exit: 'exit',
    transition: { duration },
  },

  pendingMotionProps: {
    variants: {
      enter: { scale: 2.5, opacity: 0 },
      visible: { scale: 1, opacity: 1 },
      exit: { scale: 0, opacity: 1 },
    },
    initial: 'enter',
    animate: 'visible',
    exit: 'exit',
    transition: { duration },
    style: { display: 'flex' }
  },

  duration
}