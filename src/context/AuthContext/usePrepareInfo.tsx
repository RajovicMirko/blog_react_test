import { usePosts } from "src/server/api/posts";

const usePrepareInfo = (token: string) => {
  const { data: info } = usePosts({
    options: {
      enabled: !!token,
    },
  });

  return { info };
};

export default usePrepareInfo;
