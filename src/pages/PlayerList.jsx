import PlayerItem from "../components/PlayerItem";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 15;
const GROUP_SIZE = 5;

const PlayerList = ({ loading, players, seasons }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const page = searchParams.get("page") || 1;

  const filteredPlayers = players.filter((p) =>
    keyword ? p.name.includes(keyword) : true,
  );
  const totalPage = Math.ceil(filteredPlayers.length / PAGE_SIZE);
  const group = Math.ceil(page / GROUP_SIZE);
  let groupStart = (group - 1) * GROUP_SIZE + 1;
  const groupEnd = Math.min(groupStart + GROUP_SIZE - 1, totalPage);
  if (groupEnd - groupStart + 1 < GROUP_SIZE) {
    groupStart = Math.max(1, groupEnd - GROUP_SIZE + 1);
  }

  const pages = Array.from(
    { length: groupEnd - groupStart + 1 },
    (_, i) => groupStart + i,
  );

  const handleChangePage = (num) => {
    setSearchParams({ keyword, page: num });
  };

  return (
    <div>
      <h2>
        선수목록:
        <span>{filteredPlayers.length}명</span>
      </h2>

      <div>
        {loading ? (
          <p>선수 목록을 불러오는 중입니다.</p>
        ) : (
          <ul>
            {filteredPlayers.length ? (
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

      <div>
        <button
          onClick={() => handleChangePage(1)}
          disabled={Number(page) === 1}
        >
          &lt;&lt; <span className="sr-only">처음</span>
        </button>

        <button
          onClick={() => handleChangePage(Number(page) - 1)}
          disabled={Number(page) === 1}
        >
          &lt; <span className="sr-only">이전</span>
        </button>

        {pages.map((p) =>
          p === Number(page) ? (
            <span key={p}>{p}</span>
          ) : (
            <button key={p} onClick={() => handleChangePage(p)}>
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => handleChangePage(Number(page) + 1)}
          disabled={Number(page) === totalPage}
        >
          <span className="sr-only">다음</span> &gt;
        </button>

        <button
          onClick={() => handleChangePage(totalPage)}
          disabled={Number(page) === totalPage}
        >
          <span className="sr-only">끝</span> &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default PlayerList;
