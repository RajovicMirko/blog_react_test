export const sleep = (ms = 3000) =>
  new Promise((res) => setTimeout(() => res({}), ms));
