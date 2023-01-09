import clsx from "clsx";
import { Component, For } from "solid-js";
import HandsLeft from "../../assets/hands-left.svg";
import HandsRight from "../../assets/hands-right.svg";
import { currentHand } from "../../data/hands";
import {
  isKeymapBeingEdited,
  keyToEdit,
  setKeyToEdit,
} from "../../data/keymap";
import { settings } from "../../data/settings";
import { KeysData, LeftRight, LeftRightRecord } from "../../types/util";
import { IconButton } from "./IconButton";

import styles from "./Keyboard.module.css";

export interface KeyProps {
  letter?: string;
  isActive?: boolean;
  isSecondary?: boolean;
  onClick?: () => void;
}

const letterMap: Record<string, string> = {
  Unidentified: "␣",
  " ": "␣",
};

export const Key: Component<KeyProps> = (props) => {
  const letter = () =>
    props.letter !== undefined && Object.keys(letterMap).includes(props.letter)
      ? letterMap[props.letter]
      : props.letter;

  return (
    <button
      class={clsx(styles.key, {
        [styles.isActive]: props.isActive,
        [styles.isSecondary]: props.isSecondary,
      })}
      type="button"
      onClick={() => (props.onClick ? props.onClick() : null)}
    >
      {settings.shouldShowKeyLetters && letter()}
    </button>
  );
};

export type KeyboardProps = {
  symbols: LeftRightRecord<KeysData<string>>;
  states: LeftRightRecord<KeysData<boolean>>;
};

const keys: Array<keyof KeysData<any>> = [
  "little",
  "ring",
  "middle",
  "index",
  "thumb",
];

export const Keyboard: Component<KeyboardProps> = (props) => {
  const renderKeyboardHalf = (half: LeftRight) => {
    const isLeft = half === "left";

    const icon = (
      <div
        class={clsx(styles.icon, {
          [styles.iconLeft]: isLeft,
          [styles.iconRight]: !isLeft,
        })}
      >
        <IconButton
          icon={isLeft ? HandsLeft : HandsRight}
          onClick={() => null}
          isActive={
            settings.leftRightBoth === "both" &&
            settings.shouldSwitchHands &&
            currentHand() === half
          }
          isInactive={settings.leftRightBoth === half}
        />
      </div>
    );

    return (
      <div class={clsx(styles.half, { [styles.reversed]: !isLeft })}>
        <For each={keys}>
          {(key) => {
            const isActive = () =>
              props.states[half][key] ||
              (keyToEdit()?.key === key && keyToEdit()?.half === half);
            const onClick = () => {
              isKeymapBeingEdited() ? setKeyToEdit({ key, half }) : null;
            };

            return key === "thumb" ? (
              <div class={styles.thumb}>
                <Key
                  letter={props.symbols[half][key]}
                  isActive={isActive()}
                  onClick={onClick}
                  isSecondary
                />
                {icon}
              </div>
            ) : (
              <Key
                letter={props.symbols[half][key]}
                isActive={isActive()}
                onClick={onClick}
              />
            );
          }}
        </For>
      </div>
    );
  };

  return (
    <div class={styles.keyboard}>
      {renderKeyboardHalf("left")}
      {renderKeyboardHalf("right")}
    </div>
  );
};
