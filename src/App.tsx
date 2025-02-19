import './App.css'
import GameField from './components/GameField'
import PlayerCard from './components/playerCard'
import s from './app.module.scss'
import Bottle from './components/bottle'
import { useEffect, useState } from 'react'
import CircleCounter from './components/CircleCounter'
import KissImg from './assets/Kiss.png'
import { usePlayers } from './shared/hooks/usePlayers'

function App() {
  const { players, updateMultiplePlayersScore } = usePlayers()

  const [isSpinning, setIsSpinning] = useState(false)
  const [activePlayer, setActivePlayer] = useState(1)
  const [selectedPlayer, setSelectedPlayer] = useState(1)
  const [currentActivePlayer, setCurrentActivePlayer] = useState(1)

  const [countdown, setCountdown] = useState(3)
  const [isTimerFinished, setIsTimerFinished] = useState(false)

  const [spinTimeout, setSpinTimeout] = useState<number | null>(null)
  const [countdownTimeout, setCountdownTimeout] = useState<number | null>(null)

  const playKissSound = () => {
    const kissSound = new Audio('src/assets/Kiss sound.mp3')
    kissSound.play()
  }

  const selectNewPlayer = () => {
    const availablePlayers = players.filter(
      (player) => Number(player.id) !== activePlayer
    )
    const randomIndex = Math.floor(Math.random() * availablePlayers.length)
    const newSelectedPlayer = availablePlayers[randomIndex]
    setSelectedPlayer(Number(newSelectedPlayer.id))
  }

  const updatePlayersScore = () => {
    updateMultiplePlayersScore([activePlayer.toString(), selectedPlayer.toString()])
  }

  useEffect(() => {
    selectNewPlayer()
  }, [activePlayer])


  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)

      setCountdownTimeout(timer)
      return () => clearTimeout(timer)
    } else {
      setIsTimerFinished(true)
    }
  }, [countdown])

  const handleSpin = () => {
    setIsSpinning(true)
    setActivePlayer(selectedPlayer)

    updatePlayersScore()

    playKissSound()

    setCurrentActivePlayer(activePlayer)

    const spinTimer = setTimeout(() => {
      setIsSpinning(false)
      setCountdown(3)
      setIsTimerFinished(false)
    }, 4000)

    setSpinTimeout(spinTimer)
    return () => clearTimeout(spinTimer)
  }

  useEffect(() => {
    return () => {
      if (spinTimeout) clearTimeout(spinTimeout)
      if (countdownTimeout) clearTimeout(countdownTimeout)
    }
  }, [spinTimeout, countdownTimeout])

  return (
    <>
      <GameField>
        <div className={s.playerGrid}>
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              playerId={player.id}
              avatar={player.avatar}
              name={player.name}
              activePlayer={activePlayer}
              selectPlayer={currentActivePlayer}
              isSpinning={isSpinning}
              score={player.score}
            />
          ))}
        </div>
        <div className={s.bottle}>
          <Bottle
            playerNumber={selectedPlayer}
            handleSpinTest={handleSpin}
            isTimerFinished={isTimerFinished} />
          {countdown
            ? <CircleCounter>
              {countdown}
            </CircleCounter>
            : ''}
        </div>
        {isSpinning
          ? <img src={KissImg} alt="kiss" className={s.kiss} />
          : ''}
      </GameField>
    </>
  )
}

export default App