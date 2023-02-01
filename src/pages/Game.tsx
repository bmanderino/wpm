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
            setText('Go!')
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
        <CssBaseline>
            <Container>
                <div className="countdown">{text}</div>
                <Box
                    sx={{
                        width: '100vw',
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                    <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => handleKeyStroke(e.key)}
                        disabled={isDisabled}
                        value={inputText}
                        inputProps={{ className: 'foo' }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => handleTimerButton()}>
                        {startTime === null ? 'Start' : 'Stop'}
                    </Button>
                </Box>
                {wpm !== null && wpm}
            </Container>
        </CssBaseline>
    )
}
