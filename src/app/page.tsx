'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import Reg from "./Reg";
import Game from "./Game";
import styles from "./Home.module.css";

export default function Home() {
  const [show, setShow] = useState<string>('');
  let inter;

  if (show === 'home') {
    inter = (
      <div className={styles.homeContainer}>
        <button className={styles.playButton} onClick={() => setShow('game')}>Play</button>
        <Link className={styles.leaderboardLink} href={'/table'}>Table of leaders</Link>
      </div>
    );
  } else if (show === 'reg') {
    inter = <Reg setShow={setShow}/>;
  } else if (show === 'game') {
    inter = <Game/>;
  }

  useEffect(() => {
    const getName = localStorage.getItem('name');
    if (getName) {
      setShow('home');
    } else {
      setShow('reg');
    }
  }, []);

  return (
    <div className={styles.container}>
      {inter}
    </div>
  );
}