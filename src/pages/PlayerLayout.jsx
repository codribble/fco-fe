import { Outlet } from "react-router-dom";
import SearchForm from "../components/SearchForm";

const PlayerLayout = () => {
  return (
    <section>
      <SearchForm />

      <Outlet />
    </section>
  );
};

export default PlayerLayout;
