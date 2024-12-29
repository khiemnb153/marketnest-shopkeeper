import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const buildUrl = (endpoint, searchParams) => {
  const query = new URLSearchParams(searchParams)
  const queryString = query.toString()
  return queryString ? `${endpoint}?${queryString}` : endpoint
}

export const getAbbreviationName = (name) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}
