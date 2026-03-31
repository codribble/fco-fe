import { useEffect, useState } from "react";
import {
  NEXON_META_API_SEASON,
  NEXON_META_API_SPID,
} from "../constants/nexonapi";

export const usePlayer = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayer = async () => {
      const res = await fetch(`${NEXON_META_API_SPID}`);
      if (!res.ok) {
        console.error(`에러발생: ${res.status} ${res.statusText}`);
        throw new Error(`${res.status}`);
      }
      const data = await res.json();

      setPlayers(data);
    };

    fetchPlayer();
    setLoading(false);
  }, []);

  return { loading, players };
};

export const useSeason = () => {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchSeason = async () => {
      const res = await fetch(`${NEXON_META_API_SEASON}`);
      if (!res.ok) {
        console.error(`에러발생: ${res.status} ${res.statusText}`);
        throw new Error(`${res.status}`);
      }
      const data = await res.json();

      setSeasons(data);
    };

    fetchSeason();
  }, []);

  return seasons;
};
