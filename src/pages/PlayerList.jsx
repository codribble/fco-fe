import { useState } from "react";
import PlayerItem from "../components/PlayerItem";

const PlayerList = ({ loading, players, seasons }) => {
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

      {loading ? (
        <p>선수 목록을 불러오는 중입니다.</p>
      ) : (
        <ul>
          {displayPlayers.length ? (
            displayPlayers.map((player) => {
              return (
                <PlayerItem key={player.id} player={player} seasons={seasons} />
              );
            })
          ) : (
            <li>등록된 선수가 없습니다.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default PlayerList;
