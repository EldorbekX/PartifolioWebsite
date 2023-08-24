// import { createContext, useState } from "react";
// import PropTypes from "prop-types";
// import Cookies from "js-cookie";

// import { ROLE, TOKEN } from "../constants/index";

// export const AuthContext = createContext();

// const checkTokenAvailability = () => {
//   const token = Cookies.get(TOKEN);
//   const expireDate = Cookies.get(EXPIRE_DATE);
//   if (token && expireDate >= Date.now()) {
//     return true;
//   }
//   return false;
// };

// const AuthContextProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     checkTokenAvailability()
//   );
//   const [role, setRole] = useState(Cookies.get(ROLE) || null);

//   let state = {
//     isAuthenticated,
//     setIsAuthenticated,
//     role,
//     setRole,
//   };
//   return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
// };

// AuthContextProvider.propTypes = {
//   children: PropTypes.node,
// };

// export default AuthContextProvider;

import { createContext, useState, ReactNode } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

import { ROLE, TOKEN, USER } from "../constants/index";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  role: string | null;
  setRole: (value: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  role: null,
  setRole: () => {},
});

const checkTokenAvailability = () => {
  const token = Cookies.get(TOKEN);
  const expireDate = Cookies.get(USER); // You need to define EXPIRE_DATE in your constants/index file
  if (token && expireDate && Number(expireDate) >= Date.now()) {
    return true;
  }
  return false;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    checkTokenAvailability()
  );
  const [role, setRole] = useState<string | null>(Cookies.get(ROLE) || null);

  const contextValue: AuthContextProps = {
    isAuthenticated,
    setIsAuthenticated,
    role,
    setRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
