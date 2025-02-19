import React from 'react'
import s from './circleCounter.module.scss'

type circleCounterType = {
    children: React.ReactNode
}

const CircleCounter: React.FC<circleCounterType> = ({ children }) => {

    return (
        <div className={s.circleContainer}>
            <svg viewBox="0 0 120 120" className={s.circleSvg}>
                <circle
                    className={s.circle}
                />
                <text
                    className={s.counter}
                    x='50%'
                    y="50%">
                    {children}
                </text>
            </svg>
        </div>
    )
}

export default CircleCounter