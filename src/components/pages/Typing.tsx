import clsx from "clsx";
import { Component, createEffect, createSignal, For, on } from "solid-js";
import { getText } from "../../data/text";
import Refresh from "../../assets/refresh.svg";
import Edit from "../../assets/edit.svg";
import Tempo from "../../assets/tempo.svg";
import HandsSwitch from "../../assets/hands-switch.svg";
import { Toggle } from "../blocks/Toggle";
import { DigitalSlider } from "../blocks/DigitalSlider";
import { setSettings, settings } from "../../data/settings";
import { LeftRightBothToggle } from "../blocks/LeftRightBothToggle";
import { IconButton } from "../blocks/IconButton";
import { LeftRightBoth } from "../../types/util";
import {
  isKeymapBeingEdited,
  keyToEdit,
  setIsKeymapBeingEdited,
  setKeyToEdit,
} from "../../data/keymap";
import styles from "./Typing.module.css";

const NBSP = " ";

const getWordDiff = (orig: string, word: string, isCurrent: boolean) => {
  let errors: string[] = [];
  let correct: string[] = [];

  orig.split("").forEach((sym, idx) => {
    if (word[idx] !== undefined) {
      const isCorrect = word[idx] === sym;
      errors.push(!isCorrect ? sym : NBSP);
      correct.push(isCorrect ? sym : NBSP);
    } else {
      errors.push(isCurrent ? NBSP : sym);
      correct.push(NBSP);
    }
  });

  // if (word.length - orig.length > 0) {
  //   console.log("overflow");
  //   errors = errors.concat(word.slice(orig.length).split(""));
  //   correct = correct.concat(word.slice(orig.length).split("").fill(NBSP));
  // }

  return { correct: correct.join(""), errors: errors.join("") };
};

export type TextMode = "punctuation" | "words";
export const textModes: TextMode[] = ["punctuation", "words"];

export interface TypingProps {
  inputText: string;
  setInputText: (v: string) => void;
}

export const Typing: Component<TypingProps> = (props) => {
  const [originalWords, setOriginalWords] = createSignal<string[]>([]);
  const [leftRightBoth, setLeftRightBoth] = createSignal<LeftRightBoth>("both");

  const [textMode, setTextMode] = createSignal<TextMode>("words");
  const [isRotating, setIsRotating] = createSignal(false);

  createEffect(on(textMode, () => refreshText()));

  const diff = () => {
    const errors: string[] = [];
    const correct: string[] = [];

    const inputWords = props.inputText.split(" ");

    originalWords().forEach((word, idx) => {
      if (inputWords[idx] !== undefined) {
        const { errors: err, correct: cor } = getWordDiff(
          word,
          inputWords[idx],
          inputWords[idx + 1] === undefined
        );
        errors.push(err);
        correct.push(cor);
      } else {
        const empty = new Array(word.length).fill(NBSP).join("");
        errors.push(empty);
        correct.push(empty);
      }
    });

    return {
      errors,
      correct,
    };
  };

  const refreshText = async () => {
    setIsRotating(true);
    let txt = await getText();
    if (textMode() === "words") {
      txt = txt.toLowerCase().replaceAll(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    }
    props.setInputText("");
    setOriginalWords(txt.split(" "));
    setTimeout(() => setIsRotating(false), 250);
  };

  return (
    <div class={styles.typing}>
      <div class={styles.buttons}>
        <div class="left">
          <button class={styles.refresh} type="button" onClick={refreshText}>
            <div class={clsx(styles.icon, { [styles.rotate]: isRotating() })}>
              <Refresh />
            </div>
          </button>
        </div>
        <div class="right">
          <Toggle
            options={textModes}
            value={textMode()}
            onChange={setTextMode}
          />
        </div>
      </div>

      <div class={styles.texts}>
        <div class={clsx(styles.text)}>
          <For each={originalWords()}>
            {(word) => (
              <div class={clsx(styles.word, styles.original)}>{word}</div>
            )}
          </For>
        </div>
        <div class={clsx(styles.text, styles.overlay)}>
          <For each={diff().correct}>
            {(word) => (
              <div class={clsx(styles.word, styles.correct)}>{word}</div>
            )}
          </For>
        </div>
        <div class={clsx(styles.text, styles.overlay)}>
          <For each={diff().errors}>
            {(word) => (
              <div class={clsx(styles.word, styles.errors)}>{word}</div>
            )}
          </For>
        </div>
        {/* <textarea
          class={clsx(styles.text, styles.overlay, styles.inputText)}
          name="input"
          id="input"
          spellcheck={false}
          value={inputText()}
          onInput={(e) =>
            setInputText(e.currentTarget.value.replace("\n", " "))
          }
        /> */}
      </div>

      <div class={styles.buttons}>
        <div class={styles.left}>
          <LeftRightBothToggle
            value={settings.leftRightBoth}
            onChange={(v) => setSettings("leftRightBoth", v)}
          />
          <IconButton
            icon={HandsSwitch}
            isActive={settings.shouldSwitchHands}
            isDisabled={settings.leftRightBoth !== "both"}
            onClick={() => setSettings("shouldSwitchHands", (v) => !v)}
          />
        </div>
        <div class={styles.right}>
          {isKeymapBeingEdited() && (
            <div class={styles.hint}>
              {!keyToEdit()
                ? "Какую клавишу переназначить?"
                : "Введи новую на клавиатуре"}
            </div>
          )}
          <IconButton
            icon={Edit}
            isActive={isKeymapBeingEdited()}
            onClick={() => {
              if (isKeymapBeingEdited()) {
                setKeyToEdit(undefined);
              }
              setIsKeymapBeingEdited(!isKeymapBeingEdited());
            }}
          />
          <DigitalSlider
            value={settings.keyScanFrequency}
            onChange={(v) => setSettings("keyScanFrequency", v)}
            min={20}
            max={200}
            unit="ms"
            step={10}
            iconLeft={<Tempo />}
          />
        </div>
      </div>
    </div>
  );
};
