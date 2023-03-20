import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import { TabOption } from "src/components/TabSwitcher";
import { UserEntity } from "src/server/api/users";

export const TAB_VIEW_OPTIONS: TabOption<UserEntity>[] = [
  { id: UserEntity.posts, label: "Posts" },
  { id: UserEntity.todos, label: "Todos" },
];

export const actions = [
  { id: UserEntity.posts, icon: <CreateIcon />, tooltip: "Create new Post" },
  { id: UserEntity.todos, icon: <AddIcon />, tooltip: "Add new Todo" },
];
