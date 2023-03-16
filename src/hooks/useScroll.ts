import { useEffect } from "react";

const scrollToTop = (element?: Element) => {
  const el = element ?? window;
  el.scroll({ top: 0, behavior: "smooth" });
};

const useScroll = () => {
  const handleScrollToTop = (condition: boolean, element?: Element) => {
    useEffect(() => {
      if (!condition) {
        setTimeout(() => scrollToTop(element), 0);
      }
    }, [condition, element]);
  };

  return {
    handleScrollToTop,
  };
};

export default useScroll;
