import { Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  type RouteObject,
} from "react-router-dom";

import { routes } from "./routes";
import Loader from "../components/loader";

const MainRoutes = () => {
  const routePrefix = import.meta.env.VITE_APP_ROUTE_PREFIX || "";

  return (
    <Router basename={routePrefix}>
      <Suspense fallback={<Loader isLoading={true} />}>
        <Routes>{renderRoutes(routes)}</Routes>
      </Suspense>
    </Router>
  );
};

const renderRoutes = (routes: RouteObject[]) =>
  routes.map(route => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }
    return <Route key={route.path} path={route.path} element={route.element} />;
  });

export default MainRoutes;
