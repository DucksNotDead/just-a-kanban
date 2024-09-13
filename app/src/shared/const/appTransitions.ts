const base = {
  initial: 'hidden',
  exit: 'hidden',
  animate: 'visible',
};

export const appTransitions = {
  fade: {
    variants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    ...base,
  },
  scale: {
    variants: {
      hidden: { scale: 0.9 },
      visible: { scale: 1 },
    },
    ...base,
  },
  scaleFull: {
    variants: {
      hidden: { scale: 0 },
      visible: { scale: 1 },
    },
    ...base,
  },
} as const;
