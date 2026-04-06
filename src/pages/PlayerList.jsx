import Pagination from "../components/Pagination";
import PlayerItem from "../components/PlayerItem";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../constants/pagination";

const PlayerList = ({ loading, players, seasons }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page")) || 1;

  const filteredPlayers = players.filter((p) =>
    keyword ? p.name.includes(keyword) : true,
  );
  const totalCount = filteredPlayers.length;

  const handleChangePage = (num) => {
    setSearchParams({ keyword, page: num });
  };

  return (
    <div>
      <h2>
        선수목록:
        <span>{totalCount}명</span>
      </h2>

      <div>
        {loading ? (
          <p>선수 목록을 불러오는 중...</p>
        ) : (
          <ul>
            {totalCount ? (
              filteredPlayers
                .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
                .map((player) => {
                  return (
                    <PlayerItem
                      key={player.id}
                      player={player}
                      seasons={seasons}
                    />
                  );
                })
            ) : (
              <li>등록된 선수가 없습니다.</li>
            )}
          </ul>
        )}
      </div>

      <Pagination
        currentPage={page}
        totalCount={totalCount}
        onChangePage={handleChangePage}
      />
    </div>
  );
};

export default PlayerList;
