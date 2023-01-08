import { Component, For, JSX } from "solid-js";
import { IconButton } from "./IconButton";
import HandsLeft from "../../assets/hands-left.svg";
import HandsBoth from "../../assets/hands-both.svg";
import HandsRight from "../../assets/hands-right.svg";
import styles from "./LeftRightBothToggle.module.css";
import { LeftRightBoth } from "../../types/util";

export interface LeftRightBothToggleProps {
  value: LeftRightBoth;
  onChange: (v: LeftRightBoth) => void;
}

const options: LeftRightBoth[] = ["left", "both", "right"];
const icons: Record<LeftRightBoth, JSX.Element> = {
  left: HandsLeft,
  both: HandsBoth,
  right: HandsRight,
};

export const LeftRightBothToggle: Component<LeftRightBothToggleProps> = (
  props
) => {
  return (
    <div class={styles.leftRightBothToggle}>
      <For each={options}>
        {(option) => (
          <IconButton
            icon={icons[option]}
            isActive={props.value === option}
            onClick={() => props.onChange(option)}
          />
        )}
      </For>
    </div>
  );
};
