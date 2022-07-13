import React, { FC } from "react";

import styles from "./Footer.module.css";

const thisyear = new Date().getFullYear();

export const Footer: FC = () => {
  return (
    <>
      <footer className={styles.footer}>
        <a
          href="https://unremoted.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright ©　unremoted.com　{thisyear}.
        </a>
      </footer>
    </>
  );
};
