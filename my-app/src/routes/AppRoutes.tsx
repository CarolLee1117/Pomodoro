import { useRoutes } from "react-router-dom";
import App from "../pages/App";
import Theme from "../pages/Theme";
import Timer from "../pages/Timer";
import Insights from "../pages/Insights"

function AppRoutes() {
  const routes = useRoutes([
    { path: "/", element: <App /> },
    { path: "/theme", element: <Theme /> },
    { path: "/timer", element: <Timer /> },
    { path: "/insights", element: <Insights /> },
  ]);

  return routes;
}

export default AppRoutes;