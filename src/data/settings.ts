import { createStore } from "solid-js/store";
import { LeftRightBoth } from "../types/util";

export interface SettingsStore {
  leftRightBoth: LeftRightBoth;
  shouldSwitchHands: boolean;
  shouldShowKeyLetters: boolean;
  keyRepeatFrequency: number;
  keyScanFrequency: number;
}

export const defaultSettings: SettingsStore = {
  leftRightBoth: "both",
  shouldSwitchHands: false,
  shouldShowKeyLetters: true,
  keyRepeatFrequency: 50,
  keyScanFrequency: 80,
};

export const [settings, setSettings] =
  createStore<SettingsStore>(defaultSettings);
