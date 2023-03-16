import { Route, Routes } from "react-router-dom";
import routesMap from "./routesMap";

const RouterView = () => {
  return (
    <Routes>
      {routesMap.map((route) => {
        return <Route key={route.path} {...route} />;
      })}
    </Routes>
  );
};

export default RouterView;
