export function b0(t) {
	return Math.pow(1 - t, 3)
}

export function b1(t) {
	return 3 * t * Math.pow(1 - t, 2)
}

export function b2(t) {
	return 3 * Math.pow(t, 2) * (1 - t)
}

export function b3(t) {
	return Math.pow(t, 3)
}