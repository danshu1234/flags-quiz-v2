'use client'

import { ChangeEvent, FC, useEffect, useState } from "react"
import CountsShow from "./CountsShow"
import styles from "./Game.module.css";

const Game: FC = () => {

    const [countryInfo, setCountryInfo] = useState <{name: string, flag: string} | null> (null)
    const [inputName, setInputName] = useState <string> ('')
    const [counts, setCounts] = useState <number | null> (null)

    const getMyCounts = async () => {
        const getName = localStorage.getItem('name')
        let myName = ''
        if (getName) {
            myName = JSON.parse(getName)
        }
        const countsRequest = await fetch('http://localhost:4444/get/counts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ myName })
        })
        const resultCounts = await countsRequest.json()
        setCounts(resultCounts.response)
    }

    const getRandomCountry = async () => {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        const flagUrl = randomCountry.flags.png
        const nameCountry = randomCountry.name.common
        setCountryInfo({name: nameCountry, flag: flagUrl})
    }

    const checkAnsw = () => {
        if (counts !== null) {
            if (inputName === countryInfo?.name) {
                setCounts(counts + 1)
            } else {
                setCounts(counts - 1)
            }
            getRandomCountry()
            setInputName('')
        }
    }

    const updateCounts = async () => {
        const getName = localStorage.getItem('name')
        let parsedName = ''
        if (getName) {
            parsedName = JSON.parse(getName)
        }
        await fetch('http://localhost:4444/update/counts', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ parsedName, counts })
        })
    }

    useEffect(() => {
        if (counts !== null) {
            updateCounts()
        }
    }, [counts])

    useEffect(() => {
        getRandomCountry()
        getMyCounts()

    }, [])

    return (
        <div className={styles.gameContainer}>
          <CountsShow counts={counts}/>
          <img 
            className={styles.flagImage} 
            src={countryInfo?.flag} 
            alt={countryInfo?.name || "Country flag"}
          />
          <input
            className={styles.countryInput}
            value={inputName}
            placeholder="Name of the country"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setInputName(event.target.value)}
          />
          <button className={styles.answerButton} onClick={checkAnsw}>Answer</button>
        </div>
    )
}

export default Game