import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const tap = async <T>(value: T, cb: (value: T) => Promise<unknown>): Promise<T> => {
	await cb(value)
	return value
}
