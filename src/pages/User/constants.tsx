import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import { TabOption } from "src/components/TabSwitcher";
import { Entity } from "src/server/api/users/types";

export const TAB_VIEW_OPTIONS: TabOption<Entity>[] = [
  { id: Entity.posts, label: "Posts" },
  { id: Entity.todos, label: "Todos" },
];

export const actions = [
  { id: Entity.posts, icon: <CreateIcon />, tooltip: "Create new Post" },
  { id: Entity.todos, icon: <AddIcon />, tooltip: "Add new Todo" },
];
