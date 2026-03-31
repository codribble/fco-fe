import React, { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import PlayerList from "./components/PlayerList";

const App = () => {
  const API_URL = "https://open.api.nexon.com/static/fconline/meta";
  const DB_URL = "http://localhost:4000";

  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);

  useEffect(() => {
    const fetchAndSync = async () => {
      setIsLoading((prev) => !prev);

      // const res = await fetch(`${API_URL}/spid.json`);
      // const data = await res.json();

      // for (const player of data) {
      //   await fetch("http://localhost:4000/players", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(player),
      //   });
      // }

      // setPlayers(data);
      // 1. DB에 데이터 있는지 먼저 확인
      const checkRes = await fetch(
        `${DB_URL}/players?_page=${page}&_per_page=${limit}`,
      );
      const checkJson = await checkRes.json();

      // 2. 데이터 있으면 동기화 스킵
      if (checkJson.pages > 0) {
        setIsLoading(false);
        return;
      }

      // 3. 없을 때만 API에서 가져와서 밀어넣기
      const res = await fetch(`${API_URL}/spid.json`);
      const apiData = await res.json();

      const chunkRequest = async (items, requestFn, chunkSize = 100) => {
        for (let i = 0; i < items.length; i += chunkSize) {
          const chunk = items.slice(i, i + chunkSize);
          await Promise.all(chunk.map(requestFn));
          console.log(
            `${Math.min(i + chunkSize, items.length)} / ${items.length} 완료`,
          );
        }
      };

      await chunkRequest(apiData, (player) =>
        fetch(`${DB_URL}/players`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(player),
        }),
      );

      setIsLoading((prev) => !prev);
    };

    fetchAndSync();
  }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      const res = await fetch(
        `${DB_URL}/players?_page=${page}&_per_page=${limit}`,
      );
      const json = await res.json();

      setPlayers(json.data);
    };

    fetchPlayers();
  }, [page, limit]);

  return (
    <div>
      <SearchForm />

      <PlayerList isLoading={isLoading} players={players} />
    </div>
  );
};

export default App;
