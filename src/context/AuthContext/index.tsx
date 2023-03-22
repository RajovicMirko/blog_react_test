import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
import { useComments } from "src/server/api/comments";
import { axiosAddAuthToConfig } from "../../utils/axios";
import useLoading from "../LoadingContext";
import usePrepareInfo from "./usePrepareInfo";
import usePreparePermissions from "./usePreparePermissions";
import usePrepareUser from "./usePrepareUser";

type AuthContextProps = {
  isAuthenticated: boolean;
  user: any;
  info: any;
  permissions: any;
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const { handleLoading } = useLoading();

  const [token, setToken] = useState<string>("");

  // auth like http
  useComments({
    options: {
      onSuccess: async () => {
        const tmpToken = import.meta.env.VITE_TOKEN;
        await axiosAddAuthToConfig({ token: tmpToken });
        setToken(tmpToken);
      },
    },
  });

  // prepare some more auth data
  const { user } = usePrepareUser(token);
  const { info } = usePrepareInfo(token);
  const { permissions } = usePreparePermissions(token);

  const authDone = !!token && !!user && !!info && !!permissions;

  handleLoading("auth", !authDone);

  const provide = {
    isAuthenticated: authDone,
    user,
    info,
    permissions,
  };
  return (
    <AuthContext.Provider value={provide}>
      {authDone && children}
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
