import { Component } from "solid-js";
import { dictionary, DictionaryIndex } from "../../data/dictionary";
import { LetterBlock, Letter } from "../blocks/LetterBlock";
import Alt from "../../assets/alt.svg";
import Plus from "../../assets/plus.svg";
import styles from "./Guide.module.css";

const blocks = [DictionaryIndex.PRIMARY, DictionaryIndex.ALTERNATIVE];

const letterGroups = [
  dictionary.slice(0, 4),
  dictionary.slice(4, 10),
  dictionary.slice(10, 15),
];

const [primary, alternative]: Array<Array<Array<Letter> | undefined>> =
  blocks.map((i) =>
    letterGroups.map((group) =>
      group.every((g) => g[i] !== undefined)
        ? group.map((g) => ({
            pattern: g[DictionaryIndex.PATTERN],
            left: g[i],
            right: g[i + 1],
          }))
        : undefined
    )
  );

const renderLetterStack = (stack: Array<Array<Letter> | undefined>) => (
  <div class={styles.letterStack}>
    {stack.filter(Boolean).map((group) => (
      <div class={styles.letterGroup}>
        {group!.map(
          ({ left, right, pattern }) =>
            (left !== undefined || right !== undefined) && (
              <LetterBlock left={left} right={right} pattern={pattern} />
            )
        )}
      </div>
    ))}
  </div>
);

export const Guide: Component = () => {
  return (
    <div class={styles.guide}>
      {renderLetterStack(primary)}

      <div class={styles.alternative}>
        <div class={styles.hint}>
          <LetterBlock left="" right="" pattern="1001" />
          <div class={styles.alt}>
            <Alt />
          </div>
        </div>

        <Plus />

        {renderLetterStack(alternative)}
      </div>
    </div>
  );
};
