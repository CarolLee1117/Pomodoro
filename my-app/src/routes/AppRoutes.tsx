import { useRoutes } from "react-router-dom";
import App from "../pages/App";
import Theme from "../pages/Theme";
import Timer from "../pages/Timer";

function AppRoutes() {
  // 用 useRoutes 定義所有路由表
  const routes = useRoutes([
    { path: "/", element: <App /> },
    { path: "/theme", element: <Theme/>},
    { path: "/Timer", element: <Timer/> }
  ]);

  return routes;
}

export default AppRoutes;
