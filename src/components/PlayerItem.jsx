import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlayerId, getPlayerThumb } from "../utils/player";
import playerCardStyles from "../styles/player.module.css";

const PlayerItem = ({ player, seasons }) => {
  const navigate = useNavigate();
  const [thumbs, setThumbs] = useState(0);
  const playerId = getPlayerId(player.id);
  const sid = playerId.sid;
  const season = seasons.find((s) => s.seasonId === Number(sid));

  const thumbnails = getPlayerThumb(player.id);

  const handleClick = (e) => {
    e.preventDefault();

    navigate(`/player/${player.id}`, {
      state: { name: player.name, season },
    });
  };

  return (
    <li>
      <a href="#" onClick={handleClick}>
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
      </a>
    </li>
  );
};

export default PlayerItem;
