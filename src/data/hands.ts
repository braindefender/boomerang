import { createSignal } from "solid-js";
import { LeftRight } from "../types/util";

export const [currentHand, setCurrentHand] = createSignal<LeftRight>("left");