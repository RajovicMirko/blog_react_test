import posts from "src/server/api/posts";

const usePrepareInfo = (token: string) => {
  const { data: info } = posts.many({
    options: {
      enabled: !!token,
    },
  });

  return { info };
};

export default usePrepareInfo;
