import { toast } from "react-toastify";
import { axiosErrorsMap } from "./constants";
import { throwQueryErrorIfExists } from "./helpers";

function handleError(response?: any) {
  if (!!response.code && axiosErrorsMap[response.code]) {
    // Axios error
    const message = axiosErrorsMap[response?.code as string];
    toast.error(message);
  } else {
    // Query error
    toast.error(response);
  }
}

export { throwQueryErrorIfExists };

export default handleError;
