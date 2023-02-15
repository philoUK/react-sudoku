type ScoreboardProps = {
    gamesPlayed: number
    gamesWon: number
    gamesLost: number
}

export function Scoreboard({gamesPlayed, gamesWon, gamesLost}: ScoreboardProps) {
    return (
        <div>
            <div style={{display:"grid", columnGap: "5px", gridTemplateColumns: "auto auto auto", borderBottom: "2px sold black"}}>
                <div className="score-panel">You have played <span>{gamesPlayed}</span> games so far</div>
                <div className="score-panel">Of those, you have won <span>{gamesWon}</span></div>
                <div className="score-panel">And lost <span>{gamesLost}</span></div>
            </div>
            <hr/>
        </div>
    );
}
