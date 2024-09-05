import { getRandom } from 'shared/utils';

import { defaultSliceNames } from '../model/const/sliceConst';

export function getRandomSliceName() {
  return defaultSliceNames[getRandom(defaultSliceNames.length - 1)];
}
