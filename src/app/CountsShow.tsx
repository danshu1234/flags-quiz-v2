'use client'

import { FC } from "react";
import styles from "./CountsShow.module.css";

interface Props {
  counts: number | null;
}

const CountsShow: FC<Props> = ({ counts }) => {
  return (
    <div className={styles.countsContainer}>
      <h2 className={styles.countsText}>Your score: {counts !== null ? counts : "Loading..."}</h2>
    </div>
  );
};

export default CountsShow;