import React, { useState } from "react";
import Players from "../components/Players";

const PlayerList = ({ isLoading, players }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const totalPage = Math.ceil(players.length / limit);
  const displayPlayers = players.slice((page - 1) * limit, page * limit);

  return (
    <div>
      <h2>
        선수목록:
        <span>{players.length}명</span>
      </h2>

      {isLoading ? (
        <p>선수 목록을 불러오는 중입니다.</p>
      ) : (
        <Players players={displayPlayers} />
      )}
    </div>
  );
};

export default PlayerList;
