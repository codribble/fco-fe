import React, { useEffect, useState } from "react";
import PlayerList from "./pages/PlayerList";
import { Route, Routes } from "react-router-dom";
import PlayerDetail from "./pages/PlayerDetail";
import PlayerLayout from "./pages/PlayerLayout";

const App = () => {
  const API_URL = "https://open.api.nexon.com/static/fconline/meta";

  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch(`${API_URL}/spid.json`);
        if (!res.ok) {
          console.error(`에러발생: ${res.status} ${res.statusText}`);
          throw new Error(`${res.statusText}`);
        }
        const data = await res.json();
        //   console.log(data);

        setPlayers(data);
      } catch (error) {
        console.error("데이터 로딩 실패: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/player" element={<PlayerLayout />}>
          <Route
            index
            element={<PlayerList isLoading={isLoading} players={players} />}
          />
          <Route path=":id" element={<PlayerDetail />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
