import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Layout from "src/components/Layout";
import { PageLoading } from "src/components/Loading/PageLoading";
import { AuthProvider } from "src/context/AuthContext";
import { LoadingProvider } from "src/context/LoadingContext";
import { NotificationProvider } from "src/context/Notification";
import ErrorBoundary from "src/pages/ErrorBoundary";
import RouterView from "src/router";
import MaterialUiProvider from "src/style";

const queryClient = new QueryClient({});

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
    </LocalizationProvider>
  );
}

export default App;
