import s from './playerCard.module.scss'

type PlayerCardProps = {
    playerId: string
    avatar: string
    name: string
    score?: number
    activePlayer: number
    selectPlayer: number
    isSpinning: boolean
}

const PlayerCard: React.FC<PlayerCardProps> = ({
    playerId,
    avatar,
    name,
    score,
    activePlayer,
    selectPlayer,
    isSpinning,
}) => {
    const isActive = Number(playerId) === activePlayer
    const isSelected = Number(playerId) === selectPlayer

    const getWrapperClass = () => {
        if (isSpinning && isActive) return `${s.wrapperPlayerCard} ${s.animationPlayerActive}`
        if (isSpinning && isSelected) return `${s.wrapperPlayerCard} ${s.animationPlayerSelected}`
        return s.wrapperPlayerCard
    }

    const getAvatarContainerClass = () => {
        if (isSpinning && (isActive || isSelected)) return `${s.avatarContainer} ${s.avatarContainerActive}`
        return s.avatarContainer
    }

    const getPlayerNameClass = () => isActive ? `${s.playerName} ${s.active}` : s.playerName

    const getPlayerAvatarClass = () => isActive ? `${s.playerAvatar} ${s.highlight}` : s.playerAvatar

    return (
        <div className={getWrapperClass()}>
            <div className={getAvatarContainerClass()}>
                {score !== undefined && score !== 0 && (
                    <div className={s.kissCounter}>{score}</div>
                )}
                <img
                    src={avatar}
                    alt={`${name} avatar`}
                    className={getPlayerAvatarClass()}
                />
                <h3 className={getPlayerNameClass()}>{name}</h3>
            </div>
        </div>
    )
}

export default PlayerCard