import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import Layout from "./components/Layout";
import RouterView from "./router";
import MaterialUiProvider from "./style";
import { AuthProvider } from "./context/AuthContext";
import { PageLoading } from "./components/Loading/PageLoading";
import { NotificationProvider } from "./context/Notification";
import ErrorBoundary from "./pages/ErrorBoundary";

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <MaterialUiProvider>
            <NotificationProvider>
              <LoadingProvider component={<PageLoading />}>
                <AuthProvider>
                  <Layout>
                    <RouterView />
                  </Layout>
                </AuthProvider>
              </LoadingProvider>
            </NotificationProvider>
          </MaterialUiProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
