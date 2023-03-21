import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { PageLoading } from "src/components/Loading/PageLoading";
import { AuthProvider } from "src/context/AuthContext";
import { LoadingProvider } from "src/context/LoadingContext";
import { NotificationProvider } from "src/context/Notification";
import ErrorBoundary from "src/pages/ErrorBoundary";
import MaterialUiProvider from "src/style";
import Layout from "./components/Layout";
import RouterView from "./router";

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
