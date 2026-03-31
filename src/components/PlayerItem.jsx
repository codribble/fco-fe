import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlayerId } from "../utils/player";

const THUMB_URL = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common";

const PlayerItem = ({ player }) => {
  const [thumbs, setThumbs] = useState(0);
  const playerId = getPlayerId(player.id);

  const spid = playerId.spid;
  const pid = playerId.pid;
  const sid = playerId.sid;

  console.log(sid);

  const thumsUrls = [
    `${THUMB_URL}/playersAction/p${spid}.png`,
    `${THUMB_URL}/playersAction/p${pid}.png`,
    `${THUMB_URL}/players/p${spid}.png`,
    `${THUMB_URL}/players/p${pid}.png`,
  ];

  return (
    <li>
      <Link to={`/player/${player.id}`}>
        <div>
          {thumbs < thumsUrls.length ? (
            <img
              src={thumsUrls[thumbs]}
              alt={player.name}
              onError={() => setThumbs((prev) => prev + 1)}
            />
          ) : (
            <span>No Image</span>
          )}
        </div>
        <p className="player-name">{player.name}</p>
      </Link>
    </li>
  );
};

export default PlayerItem;
