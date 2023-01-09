import { debounce, leading, throttle } from "@solid-primitives/scheduled";
import {
  Accessor,
  Component,
  createEffect,
  createMemo,
  createSignal,
  on,
  onCleanup,
  Signal,
} from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { dictionary } from "../../data/dictionary";
import { currentHand, setCurrentHand } from "../../data/hands";
import {
  isKeymapBeingEdited,
  keymap,
  keyToEdit,
  setKeymap,
} from "../../data/keymap";
import { settings } from "../../data/settings";
import {
  KeysData,
  KeysState,
  KeysSymbols,
  LeftRightBoth,
  LeftRightRecord,
} from "../../types/util";
import { Keyboard } from "../blocks/Keyboard";
import { Typing } from "../pages/Typing";
import styles from "./KeyboardManager.module.css";

export type KeyboardState = LeftRightRecord<KeysState>;

const defaultKeyState: KeysState = {
  thumb: false,
  index: false,
  middle: false,
  ring: false,
  little: false,
};

export const KeyboardManager: Component = () => {
  const [inputText, setInputText] = createSignal("");
  const [keyStates, setKeyStates] = createSignal<KeyboardState>({
    left: defaultKeyState,
    right: defaultKeyState,
  });

  return (
    <div
      class={styles.keyboardManager}
      use:keyboardEvents={{
        keys: [keyStates, setKeyStates],
        input: [inputText, setInputText],
      }}
    >
      <Typing inputText={inputText()} setInputText={setInputText} />
      <Keyboard states={keyStates()} symbols={keymap} />
    </div>
  );
};

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      keyboardEvents: {
        keys: [() => any, (v: any) => any];
        input: [() => string, (v: string) => void];
      };
    }
  }
}

export const keyboardEvents = (
  element: HTMLDivElement,
  value: Accessor<{
    keys: Signal<KeyboardState>;
    input: Signal<string>;
  }>
) => {
  const { keys, input } = value();
  const [keyStates, setKeyStates] = keys;
  const [inputText, setInputText] = input;

  const getSymbol = (state: KeysState) => {
    const pattern = getPatternFromKeyState(state);
    const group = dictionary.find((item) => item[0] === pattern);
    const symbol = state.thumb ? group?.[2] : group?.[1];
    return symbol ?? " ";
  };

  const toggleHand = () =>
    setCurrentHand((v) => (v === "left" ? "right" : "left"));

  const makeOnInput = createMemo(() =>
    leading(
      throttle,
      (symbol: string) => {
        setInputText((p) => p + symbol.toLowerCase());
        toggleHand();
      },
      settings.keyRepeatFrequency
    )
  );

  const makeScan = createMemo(() =>
    throttle(() => {
      let watchFor: KeysData<boolean>[] = [];

      if (settings.leftRightBoth === "both") {
        if (settings.shouldSwitchHands) {
          watchFor = [keyStates()[currentHand()]];
        } else {
          watchFor = [keyStates().left, keyStates().right];
        }
      } else {
        watchFor = [keyStates()[settings.leftRightBoth]];
      }
      let symbol: string | undefined = undefined;
      watchFor.forEach((part) => {
        if (Object.values(part).some(Boolean)) {
          symbol =
            symbol === undefined || symbol === " " ? getSymbol(part) : symbol;
        }
      });
      if (symbol !== undefined) {
        makeOnInput()(symbol);
      }
    }, settings.keyScanFrequency)
  );

  createEffect(
    on(keyStates, () => {
      makeScan()();
    })
  );

  const backspace = createMemo(() =>
    throttle(() => {
      setInputText((prev) => prev.slice(0, prev.length - 1));
      toggleHand();
    }, settings.keyRepeatFrequency)
  );

  const onKeyChange = (e: KeyboardEvent) => {
    const isPressed = e.type === "keydown";

    if (isKeymapBeingEdited()) {
      const key = keyToEdit();
      if (isPressed && key !== undefined) {
        setKeymap(key.half, key.key, e.key);
      }
      return;
    }

    const mapping = getKeyMapping(e.key);

    if (e.key === "Backspace" && isPressed) {
      backspace()();
      return;
    }

    if (mapping !== undefined) {
      setKeyStates((prev) => ({
        left:
          mapping.hand === "left" || mapping.hand === "both"
            ? { ...prev.left, [mapping.key]: isPressed }
            : prev.left,
        right:
          mapping.hand === "right" || mapping.hand === "both"
            ? { ...prev.right, [mapping.key]: isPressed }
            : prev.right,
      }));
    }
  };

  window.addEventListener("keyup", onKeyChange);
  window.addEventListener("keydown", onKeyChange);

  onCleanup(() => {
    window.removeEventListener("keyup", onKeyChange);
    window.removeEventListener("keydown", onKeyChange);
  });
};

type KeyMapping = { hand: LeftRightBoth; key: keyof KeysSymbols };

export const getKeyMapping = (key: string): KeyMapping | undefined => {
  let res: KeyMapping | undefined = undefined;

  Object.values(keymap).forEach((part, idx) => {
    const keys = Object.keys(part) as Array<keyof KeysData<string>>;
    const pressed = keys.find((k) => part[k] === key);
    if (pressed) {
      res = {
        hand: res !== undefined ? "both" : idx === 0 ? "left" : "right",
        key: pressed,
      };
    }
  });

  return res;
};

export const getPatternFromKeyState = (state: KeysState) => {
  const { index, middle, ring, little } = state;
  const pattern = [index, middle, ring, little]
    .map((s) => (s ? "1" : "0"))
    .join("");
  return pattern;
};
