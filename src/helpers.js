export const getExt = (str) => {
  const splitted = str.split('.');
  if (splitted.length < 2) return '';
  return splitted[splitted.length - 1];
};

export const isFile = (str) => !!getExt(str);
