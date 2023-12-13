// App.js
import _ from "lodash";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import adminRoute from "./admin/route/adminRoute";

function App() {
  const createRoutes = (routeList) =>
    _.values(routeList).map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ));

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* {createRoutes(userRoute)} */}
          {createRoutes(adminRoute)}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
