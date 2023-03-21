import posts from "src/server/api/posts";

const usePrepareUser = (token: string) => {
  const { data: user } = posts.many({
    options: {
      enabled: !!token,
    },
  });

  return { user };
};

export default usePrepareUser;
