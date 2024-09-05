import { getRandom } from 'shared/utils';

import { defaultSliceColors } from '../model/const/sliceConst';

export function getRandomSliceColor() {
  return defaultSliceColors[getRandom(defaultSliceColors.length - 1)];
}
