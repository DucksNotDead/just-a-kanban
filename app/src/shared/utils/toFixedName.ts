export function toFixedName(name: string, len: number) {
  if (name.length > len - 3) {
    return name.slice(0, len - 3) + '...'
  }
  return name
}