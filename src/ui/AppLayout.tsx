import { Outlet } from "react-router-dom";
import Header from "../page/components/Header";

const AppLayout = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return (
    <div>
      {isAuthenticated && <Header />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
