import React, { useEffect, useState } from "react";

const App = () => {
  const API_URL = "https://open.api.nexon.com/static/fconline/meta";
  const DB_URL = "http://localhost:4000";

  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [keyword, setKeyword] = useState("");
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

      // 둘 다 동시에 가져오기
      const [apiRes, dbRes] = await Promise.all([
        fetch(`${API_URL}/spid.json`),
        fetch(`${DB_URL}/players`),
      ]);

      const apiData = await apiRes.json();
      const dbData = await dbRes.json();

      // id 기준으로 Map 생성
      const dbMap = new Map(dbData.map((p) => [Number(p.id), p]));

      const toAdd = [];
      const toUpdate = [];

      for (const player of apiData) {
        const existing = dbMap.get(Number(player.id));

        if (!existing) {
          toAdd.push(player);
        } else if (JSON.stringify(existing) !== JSON.stringify(player)) {
          toUpdate.push(player);
        }
      }

      // console.log(`추가: ${toAdd.length}건, 수정: ${toUpdate.length}건`);

      const chunkRequest = async (items, requestFn, chunkSize = 100) => {
        for (let i = 0; i < items.length; i += chunkSize) {
          const chunk = items.slice(i, i + chunkSize);
          await Promise.all(chunk.map(requestFn));
          console.log(
            `${Math.min(i + chunkSize, items.length)} / ${items.length} 완료`,
          );
        }
      };

      // 추가
      await chunkRequest(toAdd, (player) =>
        fetch(`${DB_URL}/players`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(player),
        }),
      );

      // 수정
      await chunkRequest(toUpdate, (player) =>
        fetch(`${DB_URL}/players/${player.id}`, {
          method: "PATCH",
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

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div>
      <h2>선수검색</h2>
      <form onSubmit={handleSearch} autoComplete="off">
        <label htmlFor="playerName">선수명</label>
        <input
          type="text"
          value={keyword}
          onChange={handleChange}
          id="playerName"
        />
        <button type="submit">검색</button>
      </form>

      <section>
        <h2>
          선수목록:
          <span>{players.length}명</span>
        </h2>

        <ul>
          {isLoading ? (
            <li>선수 목록을 불러오고 있습니다.</li>
          ) : players.length ? (
            players.map((player) => {
              return <li key={player.id}>{player.name}</li>;
            })
          ) : (
            <li>등록된 선수가 없습니다.</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default App;
