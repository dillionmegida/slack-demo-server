export const replaceString = (
  str: string,
  sub: string = " ",
  rep: string = "-"
) => str.replace(new RegExp(sub, "ig"), rep);
