import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { Container, Box, TextField, Button } from '@mui/material'

export const Game = () => {
    const [text, setText] = useState<string>('')
    const [inputText, setInputText] = useState<string>('')
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [startTime, setStartTime] = useState<number | null>(null)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [wpm, setWpm] = useState<number | null>(null)
    const [backspaceCount, setBackspaceCount] = useState(0)

    let count = 3

    useEffect(() => {
        if (startTime === null) return
        const intervalId = setInterval(() => {
            setElapsedTime((Date.now() - startTime) / 1000)
        }, 1000)
        return () => clearInterval(intervalId)
    }, [startTime])

    const handleTimerButton = () => {
        if (startTime === null) {
            setWpm(null)
            countdown(() => {
                setIsDisabled((prev) => !prev)
                setStartTime(Date.now())
            })
        } else {
            stopTimer()
        }
    }

    const stopTimer = () => {
        setStartTime(null)
        setIsDisabled((prev) => !prev)
        calculateWPM(elapsedTime)
    }

    const handleKeyStroke = (key: string) => {
        if (key === 'Backspace' || key === 'Delete') {
            setBackspaceCount((prev) => prev + 1)
        }
        if (key === 'Enter') {
            stopTimer()
        }
    }

    const countdown = (callback: () => void) => {
        setText(String(count--))
        if (count >= 0) {
            setTimeout(() => countdown(callback), 1000)
        } else {
            setText('GO!')
            callback()
        }
    }

    const calculateWPM = (elapsedTime: number) => {
        const words = inputText.split(' ').length
        const wordsPerMin = words / (elapsedTime / 60)
        setInputText('')
        setWpm(Math.round(wordsPerMin * 10) / 10)
    }

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
            <section className="sourceText">
                <div className="sampleText">
                    "He didn't say any more, but we've always been unusually
                    communicative in a reserved way, and I understood that he
                    meant a great deal more than that. In consequence, I'm
                    inclined to reserve all judgements, a habit that has opened
                    up many curious natures to me and also made me the victim of
                    not a few veteran bores."
                </div>
            </section>
            <section className="countdown">{text}</section>
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
                        onClick={() => handleTimerButton()}>
                        {startTime === null ? 'Start' : 'Stop'}
                    </Button>
                </Box>
            </section>
            <section className="results">
                {wpm !== null && `Words per minute: ${wpm}`}
            </section>
        </Container>
    )
}
