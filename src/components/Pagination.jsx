import { GROUP_SIZE, PAGE_SIZE } from "../constants/pagination";

const Pagination = ({ currentPage, totalCount, onChangePage }) => {
  const totalPage = Math.ceil(totalCount / PAGE_SIZE);
  const group = Math.ceil(currentPage / GROUP_SIZE);
  let groupStart = (group - 1) * GROUP_SIZE + 1;
  const groupEnd = Math.min(groupStart + GROUP_SIZE - 1, totalPage);
  if (groupEnd - groupStart + 1 < GROUP_SIZE) {
    groupStart = Math.max(1, groupEnd - GROUP_SIZE + 1);
  }

  const pages = Array.from(
    { length: groupEnd - groupStart + 1 },
    (_, i) => groupStart + i,
  );

  return (
    <div>
      <button onClick={() => onChangePage(1)} disabled={currentPage === 1}>
        &lt;&lt; <span className="sr-only">처음</span>
      </button>

      <button
        onClick={() => onChangePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt; <span className="sr-only">이전</span>
      </button>

      {pages.map((p) =>
        p === currentPage ? (
          <span key={p}>{p}</span>
        ) : (
          <button key={p} onClick={() => onChangePage(p)}>
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onChangePage(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        <span className="sr-only">다음</span> &gt;
      </button>

      <button
        onClick={() => onChangePage(totalPage)}
        disabled={currentPage === totalPage}
      >
        <span className="sr-only">끝</span> &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
