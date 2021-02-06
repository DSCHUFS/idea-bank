import { createContext, useCallback, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuth") ? true : false
  );
  const [token, setToken] = useState(
    sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null
  );
  const [point, setPoint] = useState();
  const [info, setInfo] = useState();

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setToken();
    sessionStorage.removeItem("isAuth");
    sessionStorage.removeItem("token");
  }, []);

  const getProfile = useCallback(() => {
    var config = {
      method: "get",
      url: "/api/mypage/",
      headers: {
        authorization: token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setInfo(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);

  const initialState = {
    isAuthenticated,
    setIsAuthenticated,
    token,
    setToken,
    logout,
    getProfile,
    point,
    setPoint,
    info,
    setInfo,
  };

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
