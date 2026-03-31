/**
 * 선수의 고유 ID 값에서 시즌 ID까지 포함한 spid, 시즌 ID를 제외한 pid, 시즌 ID sid 를 return
 * id = spid 이고, 총 9자리 숫자(spid)
 * id 에서 앞 3자리는 시즌ID(sid), 뒤 6자리가 선수ID(pid)
 */
export const getPlayerId = (id) => {
  return {
    spid: id,
    sid: String(id).slice(0, 3),
    pid: String(id).slice(-6),
  };
};
