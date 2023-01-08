import { Component } from "solid-js";

import { KeyboardManager } from "./components/containers/KeyboardManager";
import { Guide } from "./components/pages/Guide";

import styles from "./App.module.css";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Guide />
      <KeyboardManager />
    </div>
  );
};

export default App;
