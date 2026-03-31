import React, { useEffect, useState } from "react";
import PlayerList from "./pages/PlayerList";
import { Route, Routes } from "react-router-dom";
import PlayerDetail from "./pages/PlayerDetail";
import PlayerLayout from "./pages/PlayerLayout";
import {
  NEXON_META_API_SEASON,
  NEXON_META_API_SPID,
} from "./constants/nexonapi";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch(`${NEXON_META_API_SPID}`);
        if (!res.ok) {
          console.error(`에러발생: ${res.status} ${res.statusText}`);
          throw new Error(`${res.statusText}`);
        }
        const data = await res.json();
        //   console.log(data);

        setPlayers(data);
      } catch (error) {
        console.error("선수 데이터 로딩 실패: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchSeasons = async () => {
      try {
        const res = await fetch(`${NEXON_META_API_SEASON}`);
        if (!res.ok) {
          console.error(`에러발생: ${res.status} ${res.statusText}`);
          throw new Error(`${res.statusText}`);
        }
        const data = await res.json();

        setSeasons(data);
      } catch (error) {
        console.error("시즌 데이터 로딩 실패: ", error);
      }
    };

    fetchPlayers();
    fetchSeasons();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/player" element={<PlayerLayout />}>
          <Route
            index
            element={
              <PlayerList
                isLoading={isLoading}
                players={players}
                seasons={seasons}
              />
            }
          />
          <Route path=":id" element={<PlayerDetail />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
