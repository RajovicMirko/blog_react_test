import { Link } from "@mui/material";

type LinkComponentProps = {
  path: string;
  label: string;
  component: any;
  active?: boolean;
};

const LinkComponent = ({
  path,
  label,
  component,
  active = false,
}: LinkComponentProps) => {
  return (
    <Link
      key={path}
      component={component}
      to={path as string}
      sx={linkStyle(active)}
    >
      {label}
    </Link>
  );
};

const linkStyle = (active: LinkComponentProps["active"]) => ({
  textDecoration: active ? "underline" : "none",
  color: active ? "grey.400" : "common.white",
});
export default LinkComponent;
