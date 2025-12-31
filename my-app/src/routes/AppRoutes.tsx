import { useRoutes } from "react-router-dom";
import App from "../pages/App";
import Theme from "../pages/Theme";
import Timer from "../pages/Timer";

function AppRoutes() {
  const routes = useRoutes([
    { path: "/", element: <App /> },
    { path: "/theme", element: <Theme /> },
    { path: "/timer", element: <Timer /> },
  ]);

  return routes;
}

export default AppRoutes;