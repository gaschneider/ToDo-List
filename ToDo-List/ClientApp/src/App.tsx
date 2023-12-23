import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import styled from "@emotion/styled";

const App = () => {
  return (
    <div className={styles["App"]}>
      <header className={styles["App-header"]}>
        <img src={logo} className={styles["App-logo"]} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles["App-link"]}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          To-Do List App by Gabriel Schneider
        </a>
      </header>
    </div>
  );
};

export default App;
