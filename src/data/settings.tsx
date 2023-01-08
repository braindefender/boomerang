import { createStore } from "solid-js/store";
import { LeftRightBoth } from "../types/util";

export interface SettingsStore {
  leftRightBoth: LeftRightBoth;
  shouldSwitchHands: boolean;
  keyRepeatFrequency: number;
  keyScanFrequency: number;
}

export const defaultSettings: SettingsStore = {
  leftRightBoth: "both",
  shouldSwitchHands: false,
  keyRepeatFrequency: 50,
  keyScanFrequency: 80,
};

export const [settings, setSettings] =
  createStore<SettingsStore>(defaultSettings);
