import { useRoutes } from "react-router-dom";
import App from "../pages/App";
import Account from "../pages/Account";
import Theme from "../pages/Theme";
import LoginPage from "../pages/LoginPage";

function AppRoutes() {
  // 用 useRoutes 定義所有路由表
  const routes = useRoutes([
    { path: "/", element: <App /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/account", element: <Account /> },
    { path: "/theme", element: <Theme/>}
  ]);

  return routes;
}

export default AppRoutes
