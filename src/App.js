import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Fragment, useCallback, useEffect, useState } from "react";
import DefaultComponents from "./components/DefaultComponent/DefaultComponents";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import { axiosJWT, getDetailUser, refreshToken } from "./services/UserService";
import { updateUser } from "./redux/slices/userSlices";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleDecode = () => {
    let storageData = localStorage.getItem("access_token");
    let decode = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decode = jwtDecode(storageData);
    }

    return { decode, storageData };
  };

  const handleGetDetailUser = useCallback(
    async (id, token) => {
      setLoading(true);
      const res = await getDetailUser(id, token);
      dispatch(updateUser({ ...res?.data, token }));
      setLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    const { decode, storageData } = handleDecode();
    if (decode?.id) {
      handleGetDetailUser(decode?.id, storageData);
    }
  }, [handleGetDetailUser]);

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decode } = handleDecode();
      if (decode?.exp < currentTime.getTime() / 1000) {
        const data = await refreshToken();
        localStorage.setItem(
          "access_token",
          JSON.stringify(data?.access_token)
        );
        config.headers["Authorization"] = `Bearer ${data?.access_token}`;
      }

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return (
    <LoadingComponent isLoading={loading}>
      <Router>
        <Routes>
          {routes.map((e) => {
            const Page = e.page;
            const Layout = !e.isShowHeader ? Fragment : DefaultComponents;
            const isCheckAuth = !e.isPrivate || user.isAdmin;
            return (
              <Route
                key={e.path}
                path={isCheckAuth ? e.path : "/qưe"}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </LoadingComponent>
  );
}

export default App;
