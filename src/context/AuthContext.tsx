import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { axiosAddAuthToConfig } from "../utils/axios";
import useLoading from "./LoadingContext";

type AuthContextProps = {
  isAuth: boolean;
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const { handleLoading } = useLoading();

  const [token, setToken] = useState<string>("");

  handleLoading("auth", !token);

  useEffect(() => {
    const handleSetToken = async () => {
      const tmpToken = import.meta.env.VITE_TOKEN;
      await axiosAddAuthToConfig({ token: tmpToken });
      setToken(tmpToken);
    };

    setTimeout(() => handleSetToken(), 1000);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth: !!token }}>
      {!!token && children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used under AuthProvider");
  }

  return context;
};

export default useAuthContext;
