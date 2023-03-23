import RouterView from "./router";

import Layout from "./components/Layout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { PageLoading } from "src/components/Loading/PageLoading";
import { AuthProvider } from "src/context/AuthContext";
import { LoadingProvider } from "src/context/LoadingContext";
import { NotificationProvider } from "src/context/Notification";
import ErrorBoundary from "src/pages/ErrorBoundary";
import MaterialUiProvider from "src/style";

const queryClient = new QueryClient({});

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
