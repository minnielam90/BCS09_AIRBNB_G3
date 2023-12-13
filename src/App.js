import { DatePicker } from "antd";

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
