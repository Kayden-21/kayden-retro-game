import { useState, useEffect } from "react";
import "./scoreBoard.css";
import { getData } from "../../utilities/db";
import { useNavigate } from "react-router-dom";
import { StateType } from "../../constants";

export type ScoreBoardProps = {
  username: string;
  currentScore: number;
};

type scoreInfo = {
  position: number;
  username: string;
  score: number;
}

async function GetGameLogData(username: string): Promise<scoreInfo[]> {
  try {
  //const sortedData: scoreInfo[] = [...gameLogData];
  const storedData: StateType[] = await getData(username); // Assuming getData returns an array of StateType
  console.log(storedData);

  if (!Array.isArray(storedData) || storedData.length === 0) {
    return [];
  }

  storedData.sort((a, b) => b.score - a.score);

  // Extract the "score" property from each entry and create scoreInfo objects
  const sortedData: scoreInfo[] = storedData.map((entry, index) => ({
    position: index + 1,
    username: username,         // from your StateType object
    score: entry.score,
  }));

  return sortedData;
}
catch (error) {
  console.error("Error in GetGameLogData:", error);
  return [];
}
}

export const Scoreboard = ({ username, currentScore }: ScoreBoardProps) => {  
  const navigate = useNavigate();
  const [scoreboardData, setScoreboardData] = useState<scoreInfo[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await GetGameLogData(username);
      setScoreboardData(data);

      // Find the index of the first entry that matches the current score
      const index = data.findIndex(entry => entry.score === currentScore);
      setHighlightedIndex(index);
    }
    fetchData();
  }, [username, currentScore]);


  return (
    <>
      <section className="button-container">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      </section>
      <section className="scoreboard">
        <section className="scoreboard-latestScore">
          <label className="latestScore-label">{username}</label>
          <label className="latestScore-label">Score: {currentScore}</label>
        </section>
        <section className="scoreboard-header">
          <label className="header-label">Rank</label>
          <label className="header-label">Username</label>
          <label className="header-label">High Score</label>
        </section>
        {scoreboardData.map((entry, index) => (
          <section
            key={index}
            className={`scoreboard-entry ${index === highlightedIndex ? "highlighted-entry" : ""}`}>
            <label className="position">{entry.position}</label>
            <label className="username">{entry.username}</label>
            <label className="score">{entry.score}</label>
          </section>
        ))}
      </section>
    </>
  );
};
