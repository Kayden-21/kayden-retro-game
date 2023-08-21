import { useState, useEffect } from "react";
import kayden from "../../assets/images/kayden.png";
import heart from "../../assets/images/heart.png";
import "./scoreBoard.css";
import { getData } from "../../utilities/db";

export type ScoreBoardProps = {
  username: string;
  currentScore: number;
};

type scoreInfo = {
  position: number;
  profilePhoto: string;
  username: string;
  score: number;
}

const gameLogData = [
  { position: 0, profilePhoto: heart, username: "User1", score: 32 },
  { position: 0, profilePhoto: kayden, username: "User2", score: 1 },
  { position: 0, profilePhoto: heart, username: "Us2", score: 5 },
  { position: 0, profilePhoto: kayden, username: "User4", score: 10 },
  { position: 0, profilePhoto: heart, username: "User1", score: 35 },
  { position: 0, profilePhoto: kayden, username: "User2", score: 50 },
  { position: 0, profilePhoto: heart, username: "Us2", score: 86 },
  { position: 0, profilePhoto: kayden, username: "User4", score: 20 },
  { position: 0, profilePhoto: heart, username: "User1", score: 6 },
  { position: 0, profilePhoto: kayden, username: "User2", score: 20 },
  { position: 0, profilePhoto: heart, username: "Us2", score: 16 },
  { position: 0, profilePhoto: kayden, username: "User4", score: 22 },
  { position: 0, profilePhoto: heart, username: "User1", score: 63 },
  { position: 0, profilePhoto: kayden, username: "User2", score: 77 },
  { position: 0, profilePhoto: heart, username: "Us2", score: 11 },
  { position: 0, profilePhoto: kayden, username: "User4", score: 26 }
];

async function GetGameLogData(username: string): Promise<scoreInfo[]> {
  const sortedData: scoreInfo[] = [...gameLogData];
  //const sortedData: scoreInfo[] = await getData(username);

  sortedData.sort((a, b) => b.score - a.score);

  sortedData.forEach((entry, index) => {
    entry.position = index + 1;
  });

  return sortedData;
}

export const Scoreboard = ({ username, currentScore }: ScoreBoardProps) => {
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
    <section className="scoreboard">
      <section className="scoreboard-latestScore">
        <label className="latestScore-label">{ username }</label>
        <label className="latestScore-label">Score: { currentScore }</label>
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
          <img src={entry.profilePhoto} alt={`Profile pic for ${entry.username}`} />
          <label className="username">{entry.username}</label>
          <label className="score">{entry.score}</label>
        </section>
      ))}
  </section>
  );
};
