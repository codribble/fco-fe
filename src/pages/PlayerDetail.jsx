import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getPlayerThumb } from "../utils/player";
import styles from "../styles/player.module.css";

const PlayerDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const name = state?.name;
  const [thumbs, setThumbs] = useState(0);
  const thumbnails = getPlayerThumb(id);

  return (
    <div>
      <Link to={-1}>목록으로 돌아가기</Link>

      <div className={`${styles.playerCard}`}>
        <div className={`${styles.faceon} ${styles.faceonBig}`}>
          {thumbs < thumbnails.length ? (
            <img
              src={thumbnails[thumbs]}
              alt={name}
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
              <img
                src={state?.season?.seasonImg}
                alt={state?.season?.className}
              />
            </span>
            {name}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;
