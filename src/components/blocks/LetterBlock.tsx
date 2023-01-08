import clsx from "clsx";
import { Component } from "solid-js";
import { ALT } from "../../data/dictionary";
import Alt from "../../assets/alt.svg";

import styles from "./LetterBlock.module.css";

export interface Letter {
  left: string;
  right: string;
  pattern: string; // i.e. 0110 or 1101
}

export const LetterBlock: Component<Letter> = ({ left, right, pattern }) => {
  const blocks = pattern.split("").map((l) => l === "1");

  const isAltIcon = right === ALT;
  const rightSymbol = isAltIcon ? <Alt /> : right;

  return (
    <div class={styles.letterBlock}>
      {left && <div class={clsx(styles.letter, styles.left)}>{left}</div>}

      <div class={styles.blocks}>
        {blocks.map((isActive) => (
          <div class={clsx(styles.block, { [styles.active]: isActive })} />
        ))}
      </div>

      {right && (
        <div
          class={clsx(styles.letter, styles.right, { [styles.alt]: isAltIcon })}
        >
          {rightSymbol}
        </div>
      )}
    </div>
  );
};
