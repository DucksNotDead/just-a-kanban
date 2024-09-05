export function getRandom(...args: [number, number] | [number]) {
  let min, max;
  if (args.length > 1) {
    min = args[0];
    max = args[1] as number;
  } else {
    min = 0;
    max = args[0];
  }

  return Math.round(Math.random() * (max - min)) + min;
}
