import posts from "src/server/api/posts";

const usePreparePermissions = (token: string) => {
  const { data: permissions } = posts.many({
    options: {
      enabled: !!token,
    },
  });

  return { permissions };
};

export default usePreparePermissions;
