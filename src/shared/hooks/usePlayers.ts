import { useState } from 'react'

interface StorePlayerType {
    id: string
    avatar: string
    name: string
    score: number
}

const initialPlayers: StorePlayerType[] = [
    { id: '1', avatar: 'src/assets/Regular face 1.png', name: 'Alex', score: 0 },
    { id: '2', avatar: 'src/assets/Regular face 2.png', name: 'Max', score: 0 },
    { id: '3', avatar: 'src/assets/Regular face 3.png', name: 'Sasha', score: 0 },
    { id: '4', avatar: 'src/assets/Regular face 4.png', name: 'Vik', score: 0 },
    { id: '5', avatar: 'src/assets/Regular face 5.png', name: 'Ira', score: 0 },
    { id: '6', avatar: 'src/assets/Regular face 6.png', name: 'Vika', score: 0 },
    { id: '7', avatar: 'src/assets/Regular face 7.png', name: 'Alina', score: 0 },
    { id: '8', avatar: 'src/assets/Regular face 8.png', name: 'Kim', score: 0 },
    { id: '9', avatar: 'src/assets/Regular face 9.png', name: 'Olga', score: 0 },
    { id: '10', avatar: 'src/assets/Regular face 10.png', name: 'Mark', score: 0 },
]

export function usePlayers() {
    const [players, setPlayers] = useState<StorePlayerType[]>(initialPlayers)

    const updateMultiplePlayersScore = (idsToUpdate: string[]) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                idsToUpdate.includes(player.id) ? { ...player, score: player.score + 1 } : player
            )
        )
    }

    return {
        players,
        setPlayers,
        updateMultiplePlayersScore,
    }
}