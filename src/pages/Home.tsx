import React, { useEffect, useState } from 'react'
import { Container, Box, TextField, Button } from '@mui/material'
import { markDiscrepancy } from '../utils'
import type { DiscrepancyType } from '../utils/func'

import '../index.css'
import { Link } from 'react-router-dom'

export const Home = () => {
    const [coutdownText, setCountdownText] = useState('')
    const [inputText, setInputText] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)
    const [wpm, setWpm] = useState<number | null>(null)
    const [backspaceCount, setBackspaceCount] = useState(0)
    const [errorResult, setErrorResult] = useState<DiscrepancyType | null>(null)
    const [displayResult, setDisplayResult] = useState(false)
    const [finalTally, setFinalTally] = useState<number[]>([])

    const sourceText =
        "He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgements, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores."

    const handleTimerButton = () => {
        resetValues()
        readyCountdown()
    }

    const resetValues = () => {
        setInputText('')
        setWpm(null)
        setBackspaceCount(0)
        setErrorResult(null)
        setDisplayResult(false)
    }

    const readyCountdown = () => {
        countdown(3, 'Go!', () => {
            setIsDisabled((prev) => !prev)
            minuteCountdown()
        })
    }

    const minuteCountdown = () => {
        countdown(10, 'Stop', () => {
            setIsDisabled((prev) => !prev)
            setDisplayResult(true)
        })
    }

    const countdown = (
        seconds: number,
        text: string,
        callback: () => void,
        ms: number = 1000
    ) => {
        setCountdownText(String(seconds--))
        if (seconds >= 0) {
            setTimeout(() => countdown(seconds, text, callback, ms), ms)
        } else {
            setCountdownText(text)
            callback()
        }
    }

    const saveResults = (sourceText: string, inputText: string) => {
        setWpm(calculateWPM(inputText))
        let error = markDiscrepancy(sourceText, inputText)
        setErrorResult(error)
        // install npm 'invariant' package
        // invariant(typeof wpm == 'number', 'WPM not set');
        if (typeof wpm !== 'number') throw new Error('WPM not set')

        setFinalTally((prev) => [...prev, wpm])
    }

    const handleKeyStroke = (key: string) => {
        if (key === 'Backspace' || key === 'Delete') {
            setBackspaceCount((prev) => prev + 1)
        }
    }

    const calculateWPM = (inputText: string): number => {
        return inputText.split(' ').length
    }

    useEffect(() => {
        saveResults(sourceText, inputText)
    }, [displayResult])

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
            <section className="sourceText">
                <div className="sampleText">{sourceText}</div>
            </section>
            <section className="countdown">{coutdownText}</section>
            <section className="typing-area">
                <Box
                    sx={{
                        width: '90vw',
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        padding: '10px',
                        flexWrap: 'wrap',
                    }}>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => handleKeyStroke(e.key)}
                        disabled={isDisabled}
                        value={inputText}
                        style={{ marginRight: '10px' }}
                        className="textField"
                    />
                    <Button
                        variant="contained"
                        onClick={() => handleTimerButton()}
                        disabled={!isDisabled}>
                        {'Start'}
                    </Button>
                    {displayResult && (
                        <section className="results">
                            <p>{`Words per minute: ${wpm}`}</p>
                            <p>{`Backspaces:  ${backspaceCount}`}</p>
                            {errorResult && (
                                <div
                                    className="errorText"
                                    dangerouslySetInnerHTML={{
                                        __html: errorResult.output,
                                    }}
                                />
                            )}
                            <Link
                                to="/data"
                                state={{ finalTally, errorResult }}>
                                See data visualization
                            </Link>
                        </section>
                    )}
                </Box>
            </section>
        </Container>
    )
}
