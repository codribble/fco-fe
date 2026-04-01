import { useSearchParams } from "react-router-dom";

const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [keyword, setKeyword] = useState('');
  // keyword 를 state 로 쓰지 않은 이유
  // 새로고침 시 검색 결과 페이지임에도 검색어가 사라지는 이슈로 인해
  // useState(searchParams.get('keyword') || '') 쿼리값이 있으면 쿼리값을 default 로 없으면 '' 빈값을 default 로도 설정을 해보았으나
  // state 로 쓰게 될 경우 뒤로가기시 state 값이 바뀌지 않아 이번에는 남아있는 이슈가 발생
  // 결국 keyword 는 state 처리를 하지 않고, 쿼리파라미터에서만 가져오는거로 처리
  const keyword = searchParams.get("keyword") || "";

  const handleSearch = (e) => {
    e.preventDefault();

    const value = e.target.elements.searchKeyword.value.trim();

    if (value === "") {
      alert("검색어를 입력해주세요");
      return;
    }

    setSearchParams({ keyword: value, page: 1 });
  };

  return (
    <section>
      <h2>선수검색</h2>
      <form onSubmit={handleSearch} autoComplete="off">
        <label htmlFor="playerName">선수명</label>
        <input
          key={keyword}
          type="text"
          name="searchKeyword"
          defaultValue={keyword}
          id="playerName"
        />
        <button type="submit">검색</button>
      </form>
    </section>
  );
};

export default SearchForm;
