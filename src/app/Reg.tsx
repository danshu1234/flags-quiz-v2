'use client'

import { ChangeEvent, FC, useState } from "react";
import styles from "./Reg.module.css";

interface Props {
  setShow: Function,
}

const Reg: FC<Props> = (props) => {
  const [myName, setMyName] = useState<string>('');

  const saveName = async () => {
    if (myName !== '') {
      localStorage.setItem('name', JSON.stringify(myName));
      const addNewPlayer = await fetch('http://localhost:4444/add/player', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ myName })
      });
      const resultAdd = await addNewPlayer.json();
      console.log(resultAdd.response);
      props.setShow('game');
    }
  };

  return (
    <div className={styles.regContainer}>
      <input
        className={styles.nameInput}
        placeholder="Enter your name"
        onChange={(event: ChangeEvent<HTMLInputElement>) => setMyName(event.target.value)}
      />
      <button className={styles.regButton} onClick={saveName}>Register</button>
    </div>
  );
};

export default Reg;