export type LeftRight = "left" | "right";
export type LeftRightBoth = LeftRight | "both";

export type LeftRightRecord<T> = Record<LeftRight, T>;

export type KeysData<T> = {
  thumb: T;
  index: T;
  middle: T;
  ring: T;
  little: T;
};

export type KeysState = KeysData<boolean>;
export type KeysSymbols = KeysData<string>;
