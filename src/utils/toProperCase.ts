export const toProperCase = (str: string) =>
  `${str[0].toUpperCase()}${str.slice(1, str.length)}`;
