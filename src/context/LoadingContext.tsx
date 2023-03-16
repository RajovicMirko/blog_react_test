import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type HandleLoadingFn = (key: string, condition: boolean) => void;

type LoadingContextResponse = {
  isAppLoading: boolean;
  handleLoading: HandleLoadingFn;
};

const LoadingContext = createContext({} as LoadingContextResponse);

const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used under LoadingProvider");
  }

  return context;
};

type LoadingProviderProps = {
  component: JSX.Element;
};

export const LoadingProvider = ({
  children,
  component,
}: PropsWithChildren<LoadingProviderProps>) => {
  const [isAppLoading, setIsAppLoading] = useState<boolean>(false);
  const [loadingKeys, setLoadingKeys] = useState<string[]>([]);

  const subscribe = (key: string) => {
    setLoadingKeys((prevState) => {
      const keyExists = prevState?.includes(key);
      return !keyExists ? [...prevState, key] : prevState;
    });
  };

  const unsubscribe = (key: string) => {
    if (loadingKeys?.includes(key)) {
      const setFn = () =>
        setLoadingKeys((prevState) => {
          return prevState.filter((item) => item !== key);
        });

      // push unsubscribe to event loop queue
      setTimeout(setFn, 0);
    }
  };

  const handleLoading: HandleLoadingFn = (key, condition) => {
    useEffect(() => {
      const handleFn = condition ? subscribe : unsubscribe;
      handleFn(key);
    }, [condition]);
  };

  useEffect(() => {
    const tmpLoading = !!loadingKeys.length;
    if (tmpLoading !== isAppLoading) setIsAppLoading(tmpLoading);
  }, [loadingKeys]);

  return (
    <LoadingContext.Provider value={{ handleLoading, isAppLoading }}>
      {!!loadingKeys.length && component}
      {children}
    </LoadingContext.Provider>
  );
};

export default useLoading;
