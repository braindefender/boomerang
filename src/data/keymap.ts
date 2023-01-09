import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { KeysSymbols, LeftRight, LeftRightRecord } from "../types/util";

export type KeymapStore = LeftRightRecord<KeysSymbols>;

const defaultKeymap: KeymapStore = {
  left: {
    thumb: " ",
    index: "f",
    middle: "d",
    ring: "s",
    little: "a",
  },
  right: {
    thumb: "Unidentified",
    index: "j",
    middle: "k",
    ring: "l",
    little: "~",
  },
};

export const [keymap, setKeymap] = createStore<KeymapStore>(defaultKeymap);

export const [isKeymapBeingEdited, setIsKeymapBeingEdited] =
  createSignal<boolean>(false);

export interface KeyToEditInfo {
  half: LeftRight;
  key: keyof KeysSymbols;
}

export const [keyToEdit, setKeyToEdit] = createSignal<
  KeyToEditInfo | undefined
>(undefined);
