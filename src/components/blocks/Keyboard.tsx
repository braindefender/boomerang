import clsx from "clsx";
import { Component } from "solid-js";
import HandsLeft from "../../assets/hands-left.svg";
import HandsRight from "../../assets/hands-right.svg";
import { currentHand } from "../../data/hands";
import { settings } from "../../data/settings";
import { IconButton } from "./IconButton";

import styles from "./Keyboard.module.css";

export interface KeyProps {
  isActive?: boolean;
  isSecondary?: boolean;
}

export const Key: Component<KeyProps> = (props) => (
  <div
    class={clsx(styles.key, {
      [styles.isActive]: props.isActive,
      [styles.isSecondary]: props.isSecondary,
    })}
  />
);

export type KeyStates = {
  thumb: boolean;
  index: boolean;
  middle: boolean;
  ring: boolean;
  little: boolean;
};

export interface KeyboardProps {
  left: KeyStates;
  right: KeyStates;
}

export const Keyboard: Component<KeyboardProps> = (props) => (
  <div class={styles.keyboard}>
    <div class={styles.left}>
      <Key isActive={props.left.little} />
      <Key isActive={props.left.ring} />
      <Key isActive={props.left.middle} />
      <Key isActive={props.left.index} />

      <div class={styles.thumb}>
        <Key isActive={props.left.thumb} isSecondary />
        <div class={clsx(styles.icon, styles.iconLeft)}>
          <IconButton
            icon={HandsLeft}
            onClick={() => null}
            isActive={
              settings.leftRightBoth === "both" &&
              settings.shouldSwitchHands &&
              currentHand() === "left"
            }
            isInactive={settings.leftRightBoth === "left"}
          />
        </div>
      </div>
    </div>

    <div class={styles.right}>
      <div class={styles.thumb}>
        <Key isActive={props.right.thumb} isSecondary />
        <div class={clsx(styles.icon, styles.iconRight)}>
          <IconButton
            icon={HandsRight}
            onClick={() => null}
            isActive={
              settings.leftRightBoth === "both" &&
              settings.shouldSwitchHands &&
              currentHand() === "right"
            }
            isInactive={settings.leftRightBoth === "right"}
          />
        </div>
      </div>

      <Key isActive={props.right.index} />
      <Key isActive={props.right.middle} />
      <Key isActive={props.right.ring} />
      <Key isActive={props.right.little} />
    </div>
  </div>
);
