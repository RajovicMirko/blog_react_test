import { usePosts } from "src/server/api/posts";

const usePrepareUser = (token: string) => {
  const { data: user } = usePosts({
    options: {
      enabled: !!token,
    },
  });

  return { user };
};

export default usePrepareUser;
