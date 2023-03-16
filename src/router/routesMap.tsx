import { RouteProps } from "react-router-dom";
import UserPage from "src/pages/User";
import UsersPage from "src/pages/Users";

type RouteCustomProps = RouteProps & {
  path: RoutePath;
};

export enum RoutePath {
  users = "/",
  user = "/:id",
}

const routesMap: RouteCustomProps[] = [
  { path: RoutePath.users, element: <UsersPage /> },
  { path: RoutePath.user, element: <UserPage /> },
];

export const pageDataMap = {
  [RoutePath.users]: { name: "Users" },
  [RoutePath.user]: { name: "User" },
};

type GetRoute = { [key in keyof typeof RoutePath]: (props?: any) => string };
export const getRoute: GetRoute = {
  users: () => RoutePath.users as string,
  user: ({ id }) => RoutePath.user.replace(":id", id),
};

export default routesMap;
