import React from 'react'
import s from './gameField.module.scss'

type GameFieldProps = {
    children: React.ReactNode
}

const GameField: React.FC<GameFieldProps> = ({ children }) => {
    return (
        <div className={s.wrapperField}>
            {children}
        </div>
    )
}

export default GameField