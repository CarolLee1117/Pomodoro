import { useRoutes } from "react-router-dom";
import App from "../App";
import Account from "../Account";

function AppRoutes() {
  // 用 useRoutes 定義所有路由表
  const routes = useRoutes([
    { path: "/", element: <App /> },
    { path: "/account", element: <Account /> },
  ]);

  return routes;
}

export default AppRoutes
