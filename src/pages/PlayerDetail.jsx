import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlayerId, getPlayerThumb } from "../utils/player";
import styles from "../styles/player.module.css";
import playerDetailStyles from "../pages/PlayerDetail.module.css";

const PlayerDetail = ({ players, seasons }) => {
  const { id } = useParams();
  const [thumbs, setThumbs] = useState(0);
  const { pId, sId } = getPlayerId(id);
  const thumbnails = getPlayerThumb(id);
  const player = players.find((p) => p.id === Number(id));
  const season = seasons.find((s) => s.seasonId === Number(sId));

  useEffect(() => {
    setThumbs(0);
  }, [id]);

  const others = players.filter(
    (p) =>
      Number(String(p.id).slice(-6)) === Number(pId) &&
      Number(String(p.id).slice(0, 3)) !== Number(sId),
  );
  const otherSeasonIds = others.map((p) => Number(String(p.id).slice(0, 3)));
  const otherSeasons = seasons.filter((s) =>
    otherSeasonIds.includes(s.seasonId),
  );

  // console.log(player, season);

  return (
    <div>
      <Link to={"/player"}>목록으로 돌아가기</Link>

      <div className={`${styles.playerCard}`}>
        <div className={`${styles.faceon} ${styles.faceonBig}`}>
          {thumbs < thumbnails.length ? (
            <img
              src={thumbnails[thumbs]}
              alt={player?.name}
              width={150}
              onError={() => setThumbs((prev) => prev + 1)}
            />
          ) : (
            <span>No Image</span>
          )}
        </div>

        <div className={`${styles.playerInfo}`}>
          <h2 className={`${styles.playerName}`}>
            <span className={`${styles.season}`}>
              <img src={season?.seasonImg} alt={season?.className} />
            </span>
            {player?.name}
          </h2>
        </div>
      </div>

      <div className={`${playerDetailStyles.otherSeasons}`}>
        {otherSeasons.length ? (
          otherSeasons.map((s) => {
            const otherPlayer = others.find(
              (p) => Number(String(p.id).slice(0, 3)) === s.seasonId,
            );

            return (
              <Link key={s.seasonId} to={`/player/${otherPlayer.id}`}>
                <img src={s.seasonImg} alt={s.className} width={30} />
              </Link>
            );
          })
        ) : (
          <p>현재 시즌 외 다른 시즌이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default PlayerDetail;
