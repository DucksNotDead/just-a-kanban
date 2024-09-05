export const appTransitions = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { scale: 0.9 },
    visible: { scale: 1 },
  },
  scaleFull: {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  }
} as const;
