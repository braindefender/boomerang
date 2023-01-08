export type LeftRight = 'left' | 'right'
export type LeftRightBoth = LeftRight | 'both'

export type LeftRightRecord<T> = Record<LeftRight, T>
