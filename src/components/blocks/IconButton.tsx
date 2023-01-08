import clsx from "clsx";
import { Component, JSX } from "solid-js";

import styles from "./IconButton.module.css";

export interface IconButtonProps {
  icon: JSX.Element;
  isActive?: boolean;
  isInactive?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

export const IconButton: Component<IconButtonProps> = (props) => {
  return (
    <button
      class={clsx(styles.iconButton, {
        [styles.isActive]: props.isActive !== undefined && props.isActive,
        [styles.isInactive]: props.isInactive !== undefined && props.isInactive,
        [styles.isDisabled]: props.isDisabled,
      })}
      onClick={() => (!props.isDisabled ? props.onClick() : null)}
    >
      {props.icon}
    </button>
  );
};
