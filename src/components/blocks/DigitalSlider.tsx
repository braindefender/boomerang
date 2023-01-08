import clsx from "clsx";
import { Component, JSX } from "solid-js";

import styles from "./DigitalSlider.module.css";

export interface DigitalSliderProps {
  value: number;
  step: number;
  min?: number;
  max?: number;
  unit?: string;
  isFloat?: boolean;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  onChange: (v: number) => void;
}

export const DigitalSlider: Component<DigitalSliderProps> = (props) => {
  const parse = (v: string) => (props.isFloat ? parseFloat(v) : parseInt(v));

  const handleInput = (v: string, delta?: number) => {
    let val = parse(v);

    val = !isNaN(val) ? val + (delta ?? 0) : 0;

    if (props.min !== undefined) {
      val = val < props.min ? props.min : val;
    }
    if (props.max !== undefined) {
      val = val > props.max ? props.max : val;
    }

    props.onChange(val);
  };

  return (
    <div class={styles.digitalSlider}>
      {props.iconLeft && (
        <div class={clsx(styles.icon, styles.left)}>{props.iconLeft}</div>
      )}

      <div
        class={styles.wrapper}
        onWheel={(e) =>
          handleInput(
            props.value.toString(),
            (e.deltaY > 0 ? -1 : 1) * props.step
          )
        }
      >
        <textarea
          class={styles.input}
          value={props.value}
          rows={1}
          cols={props.value.toString().length}
          onInput={(e) => handleInput(e.currentTarget.value)}
        />
        {props.unit && <div class={styles.unit}>{props.unit}</div>}
      </div>

      {props.iconRight && (
        <div class={clsx(styles.icon, styles.right)}>{props.iconRight}</div>
      )}
    </div>
  );
};
