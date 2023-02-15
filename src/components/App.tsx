import { useState } from "react";
import { Game } from "./game/Game";
import { Scoreboard } from "./Scoreboard";
import "../styles/App.css";

function App() {
  const [count, setCount] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  const [gamesLost, setGamesLost] = useState(0);

  return (
    <div className="App">
      <div
        style={{ maxWidth: "800px", background: "gainsboro", margin: "0 auto" }}
      >
        <Scoreboard
          gamesPlayed={gamesPlayed}
          gamesWon={gamesWon}
          gamesLost={gamesLost}
        />
        <Game />
      </div>
    </div>
  );
}

export default App;
