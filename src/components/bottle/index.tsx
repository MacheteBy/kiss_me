import React, { useEffect, useState } from 'react'
import bottleImg from '../../assets/Bottle.png'
import s from './bottle.module.scss'

type BottleType = {
    playerNumber: number
    handleSpinTest: () => void
    isTimerFinished: boolean
}

const playersPosition = {
    1: 315,
    2: 360,
    3: 45,
    4: 290,
    5: 70,
    6: 250,
    7: 110,
    8: 225,
    9: 180,
    10: 135,
}

const Bottle: React.FC<BottleType> = ({ playerNumber, handleSpinTest, isTimerFinished }) => {
    const [angle, setAngle] = useState(0)
    const [spinTimeout, setSpinTimeout] = useState<number | null>(null)

    const playSpinningSound = () => {
        const kissSound = new Audio('src/assets/Spinning sound.mp3')
        kissSound.play()
    }

    const validatePlayerPosition = (player: number): boolean => {
        if (!(player in playersPosition)) {
            console.error(`Нет позиции для игрока ${player}`)
            return false
        }
        return true
    }

    const calculateTargetAngle = (currentAngle: number, targetAngle: number): number => {
        let angleDifference = targetAngle - currentAngle
        if (angleDifference < 0) {
            angleDifference += 360
        }
        return angleDifference
    }

    const handleSpin = () => {
        if (!validatePlayerPosition(playerNumber)) return

        const targetAngle = playersPosition[playerNumber as keyof typeof playersPosition]
        const currentAngle = angle % 360
        const angleDifference = calculateTargetAngle(currentAngle, targetAngle)
        const randomTurns = Math.floor(Math.random() * 10) + 3

        playSpinningSound()

        setAngle((prevAngle) => prevAngle + angleDifference + randomTurns * 360)

        const timer = setTimeout(() => {
            handleSpinTest()
        }, 4000)

        setSpinTimeout(timer)
    }

    useEffect(() => {
        if (isTimerFinished) {
            handleSpin()
        }
    }, [isTimerFinished])

    useEffect(() => {
        return () => {
            if (spinTimeout) {
                clearTimeout(spinTimeout)
            }
        }
    }, [spinTimeout])

    return (
        <div
            className={s.bottleContainer}>
            <img
                src={bottleImg}
                alt="bottle"
                className={s.bottle}
                style={{
                    transform: `rotate(${angle}deg)`,
                    transition: 'transform 4s ease-out',
                }}
            />
        </div>
    )
}

export default Bottle