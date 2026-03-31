import PlayerItem from "./PlayerItem";

const Players = ({ players }) => {
  return (
    <ul>
      {players.length ? (
        players.map((player) => {
          return <PlayerItem key={player.id} player={player} />;
        })
      ) : (
        <li>등록된 선수가 없습니다.</li>
      )}
    </ul>
  );
};

export default Players;
