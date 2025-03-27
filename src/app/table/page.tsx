'use client'

import { FC, useEffect, useRef, useState } from "react"
import styles from "./Table.module.css";

interface TopListPlayer{
    name: string,
    count: number,
}

const Table: FC = () => {

    const myRef = useRef <HTMLDivElement> (null)

    const [leaders, setLeaders] = useState <TopListPlayer[]> ([])

    const getTopList = async () => {
        const getAllPlayers = await fetch('http://localhost:4444/get/all')
        const resultList = await getAllPlayers.json()
        const resultLeaders = resultList.response
        const sortedList = resultLeaders.sort((a: TopListPlayer, b: TopListPlayer) => b.count - a.count)
        setLeaders(sortedList)
    }

    useEffect(() => {
        getTopList()
    }, [])

    return (
        <div className={styles.tableContainer}>
          <button 
            className={styles.findButton}
            onClick={() => myRef.current?.scrollIntoView({ behavior: 'smooth' })}
          >
            Find me
          </button>
          <ul className={styles.leaderList}>
            {leaders.map((item: TopListPlayer, index: number) => {
              if (JSON.stringify(item.name) !== localStorage.getItem('name')) {
                return (
                  <li key={index} className={styles.leaderItem}>
                    <div className={styles.playerCard}>
                      <h3>{item.name}</h3>
                      <h3>{item.count}</h3>
                    </div>
                  </li>
                );
              } else {
                return (
                  <li key={index} className={styles.leaderItem}>
                    <div 
                      ref={myRef} 
                      className={`${styles.playerCard} ${styles.currentPlayer}`}
                    >
                      <h3>{item.name}</h3>
                      <h3>{item.count}</h3>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      );
}

export default Table