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
import { dictionary } from "../../data/dictionary";
import { currentHand, setCurrentHand } from "../../data/hands";
import { settings } from "../../data/settings";
import { LeftRight, LeftRightRecord } from "../../types/util";
import { KeyStates, Keyboard } from "../blocks/Keyboard";
import { Typing } from "../pages/Typing";
import styles from "./KeyboardManager.module.css";

export type KeyboardState = LeftRightRecord<KeyStates>;

const defaultKeyState = {
  thumb: false,
  index: false,
  middle: false,
  ring: false,
  little: false,
};

export const KeyboardManager: Component = () => {
  const [inputText, setInputText] = createSignal("");
  const [activeKeys, setActiveKeys] = createSignal<KeyboardState>({
    left: defaultKeyState,
    right: defaultKeyState,
  });

  return (
    <div
      class={styles.keyboardManager}
      use:keyboardEvents={{
        keys: [activeKeys, setActiveKeys],
        input: [inputText, setInputText],
      }}
    >
      <Typing inputText={inputText()} setInputText={setInputText} />
      <Keyboard left={activeKeys().left} right={activeKeys().right} />
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
  const [activeKeys, setActiveKeys] = keys;
  const [inputText, setInputText] = input;

  const getSymbol = (states: KeyStates) => {
    const pattern = getPatternFromKeyStates(states);
    const group = dictionary.find((item) => item[0] === pattern);
    const symbol = states.thumb ? group?.[2] : group?.[1];
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
      let watchFor: KeyStates[] = [];

      if (settings.leftRightBoth === "both") {
        if (settings.shouldSwitchHands) {
          watchFor = [activeKeys()[currentHand()]];
        }
        watchFor = [activeKeys().left, activeKeys().right];
      } else {
        watchFor = [activeKeys()[settings.leftRightBoth]];
      }

      watchFor.forEach((part) =>
        Object.values(part).some(Boolean)
          ? makeOnInput()(getSymbol(part))
          : undefined
      );
    }, settings.keyScanFrequency)
  );

  createEffect(
    on(activeKeys, () => {
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
    const mapping = getKeyMapping(e.key);
    const isPressed = e.type === "keydown";

    if (e.key === "Backspace" && isPressed) {
      backspace()();
    }

    if (mapping !== undefined) {
      setActiveKeys((prev) => ({
        left:
          mapping.hand === "left"
            ? { ...prev.left, [mapping.key]: isPressed }
            : prev.left,
        right:
          mapping.hand === "right"
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

type KeyMapping = Record<string, keyof KeyStates>;

const keyboardMap: LeftRightRecord<KeyMapping> = {
  left: {
    a: "little",
    s: "ring",
    d: "middle",
    f: "index",
    " ": "thumb",
  },
  right: {
    Unidentified: "thumb",
    j: "index",
    k: "middle",
    l: "ring",
    "~": "little",
  },
};

export const getKeyMapping = (
  key: string
):
  | { hand: keyof LeftRightRecord<KeyMapping>; key: keyof KeyStates }
  | undefined => {
  const { left, right } = keyboardMap;
  const pressedKeyLeft = Object.keys(left).find((k) => k === key);
  const pressedKeyRight = Object.keys(right).find((k) => k === key);

  if (pressedKeyLeft) {
    return { hand: "left", key: left[pressedKeyLeft] };
  }
  if (pressedKeyRight) {
    return { hand: "right", key: right[pressedKeyRight] };
  }
};

export const getPatternFromKeyStates = (states: KeyStates) => {
  const { index, middle, ring, little } = states;
  const pattern = [index, middle, ring, little]
    .map((s) => (s ? "1" : "0"))
    .join("");
  return pattern;
};
