import { RouteProps } from "react-router-dom";
import PostPage from "src/pages/Post";
import UserPage from "src/pages/User";
import UsersPage from "src/pages/Users";

type RouteCustomProps = RouteProps & {
  path: RoutePath;
};

export enum RoutePath {
  users = "/",
  user = "/user",
  post = "/user/post",
}

const routesMap: RouteCustomProps[] = [
  { path: RoutePath.users, element: <UsersPage /> },
  { path: RoutePath.user, element: <UserPage /> },
  { path: RoutePath.post, element: <PostPage /> },
];

export default routesMap;
