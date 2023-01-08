import clsx from "clsx";
import { Component, For } from "solid-js";

import styles from "./Toggle.module.css";

export interface ToggleProps {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}

export const Toggle: Component<ToggleProps> = (props) => {
  return (
    <div class={styles.toggle}>
      <For each={props.options}>
        {(opt) => (
          <button
            class={clsx(styles.button, {
              [styles.active]: props.value === opt,
            })}
            type="button"
            onClick={() => props.onChange(opt)}
          >
            {opt}
          </button>
        )}
      </For>
    </div>
  );
};
