export const getPlayerId = (id) => {
  /**
   * 선수의 고유 ID 값에서 시즌 ID까지 포함한 spid, 시즌 ID를 제외한 pid, 시즌 ID sid 를 return
   * id = spid 이고, 총 9자리 숫자(spid)
   * id 에서 앞 3자리는 시즌ID(sid), 뒤 6자리가 선수ID(pid)
   */
  const spid = id; // full id
  const sid = String(id).slice(0, 3); // season id
  const pid = Number(String(id).slice(-6)); // player id

  return {
    spid,
    sid,
    pid,
  };
};

export const getPlayerThumb = (id) => {
  /**
   * 선수 미페(미니 페이스온) 가져오기
   */
  const THUMB_URL = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common";

  const playerId = getPlayerId(id);
  const spid = playerId.spid;
  const pid = playerId.pid;

  const thumbsUrls = [
    `${THUMB_URL}/playersAction/p${spid}.png`,
    `${THUMB_URL}/playersAction/p${pid}.png`,
    `${THUMB_URL}/players/p${spid}.png`,
    `${THUMB_URL}/players/p${pid}.png`,
  ];

  return thumbsUrls;
};
