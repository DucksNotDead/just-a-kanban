import { sliceNameLen } from '../model/const/sliceConst';

export function toFixedSliceName(name: string) {
  if (name.length > sliceNameLen - 3) {
    return name.slice(0, sliceNameLen - 3) + '...'
  }
  return name
}