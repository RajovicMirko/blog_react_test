import { UserStatus } from "./types";

export const getUserColorByStatus = (status: UserStatus) => {
  switch (status) {
    case UserStatus.active:
      return "success.main";
    default:
      return "error";
  }
};
