export const getAllSeason = async () => {
  const res = await fetch("http://localhost:8080/api/season");
  if (!res.ok) {
    console.error(`에러발생: ${res.status} ${res.statusText}`);
    throw new Error(`${res.status}`);
  }

  return await res.json();
};
