import playerCardStyles from "../styles/player.module.css";
import { Link } from "react-router-dom";

const PlayerItem = ({ player, seasons }) => {
  // const season = seasons.find((s) => s.seasonId === Number(sId));

  console.log(player);

  return (
    <li>
      <Link to={`/player/${player.spid}`}>
        <div className={`${playerCardStyles.playerCard}`}>
          <div className={`${playerCardStyles.faceon}`}>
            {player.faceon ? (
              <img src={player.faceon} alt={player.name} width={80} />
            ) : (
              <span>No Image</span>
            )}
          </div>
          <div className={`${playerCardStyles.playerInfo}`}>
            <p className={`${playerCardStyles.playerName}`}>
              <span className={`${playerCardStyles.season}`}>
                {/* <img src={season?.seasonImg} alt={season?.className} /> */}
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
