import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/player">선수검색</Link>
          </li>
          <li>
            <Link
              to=""
              onClick={(e) => {
                e.preventDefault();
                alert("준비중입니다");
                return false;
              }}
            >
              유저검색
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
