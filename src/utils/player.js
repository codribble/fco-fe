export const getPlayerId = (id) => {
  /**
   * 선수의 고유 ID 값에서 시즌 ID까지 포함한 Number(spId), 시즌 ID를 제외한 pId, 시즌 ID sId 를 return
   * id = spId 이고, 총 9자리 숫자(spId)
   * id 에서 앞 3자리는 시즌ID(sId), 뒤 6자리가 선수ID(pId)
   */
  const spId = id; // full id
  const sId = String(id).slice(0, 3); // season id
  const pId = String(id).slice(-6); // player id

  return {
    spId,
    sId,
    pId,
  };
};

export const getPlayerThumb = (id) => {
  /**
   * 선수 미페(미니 페이스온) 가져오기
   */
  const THUMB_URL = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common";

  const { spId, pId } = getPlayerId(id);

  const thumbsUrls = [
    `${THUMB_URL}/playersAction/p${Number(spId)}.png`,
    `${THUMB_URL}/playersAction/p${Number(pId)}.png`,
    `${THUMB_URL}/players/p${Number(spId)}.png`,
    `${THUMB_URL}/players/p${Number(pId)}.png`,
  ];

  return thumbsUrls;
};
