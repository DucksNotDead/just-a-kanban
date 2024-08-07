export function useAnimatedStyle(Style: string, condition: boolean): string {
	return condition ? Style : ''
}