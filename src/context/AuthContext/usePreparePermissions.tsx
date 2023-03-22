import { usePosts } from "src/server/api/posts";

const usePreparePermissions = (token: string) => {
  const { data: permissions } = usePosts({
    options: {
      enabled: !!token,
    },
  });

  return { permissions };
};

export default usePreparePermissions;
