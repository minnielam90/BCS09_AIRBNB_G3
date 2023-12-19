import { BrowserRouter, Route, Routes } from "react-router-dom";
import _ from "lodash";
import { adminRoute } from "./admin/route/adminRoute";
import { userRoute } from "./user/route/userRoute";

function App() {
  const createRoutes = (routeList) =>
    _.values(routeList).map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ));

  return (
    <>
      <BrowserRouter>
        <Routes>
          {createRoutes(userRoute)}
          {createRoutes(adminRoute)}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
