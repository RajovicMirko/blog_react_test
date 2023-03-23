import { Typography } from "@mui/material";
import { Component, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  //   // custom loger
  // }

  public render() {
    if (this.state.hasError) {
      return <Typography variant="h1">Sorry.. there was an error</Typography>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
