import { useState } from "react";
import { getPlayerId, getPlayerThumb } from "../utils/player";
import playerCardStyles from "../styles/player.module.css";
import { Link } from "react-router-dom";

const PlayerItem = ({ player, seasons }) => {
  const [thumbs, setThumbs] = useState(0);
  const { spId, sId } = getPlayerId(player.id);
  const season = seasons.find((s) => s.seasonId === Number(sId));

  const thumbnails = getPlayerThumb(spId);

  return (
    <li>
      <Link to={`/player/${spId}`}>
        <div className={`${playerCardStyles.playerCard}`}>
          <div className={`${playerCardStyles.faceon}`}>
            {thumbs < thumbnails.length ? (
              <img
                src={thumbnails[thumbs]}
                alt={player.name}
                width={80}
                onError={() => setThumbs((prev) => prev + 1)}
              />
            ) : (
              <span>No Image</span>
            )}
          </div>
          <div className={`${playerCardStyles.playerInfo}`}>
            <p className={`${playerCardStyles.playerName}`}>
              <span className={`${playerCardStyles.season}`}>
                <img src={season?.seasonImg} alt={season?.className} />
              </span>
              {player.name}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default PlayerItem;
