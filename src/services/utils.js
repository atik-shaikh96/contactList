export const getUniqueId = () => {
  return new Date().getTime();
};

export const getIconLetters = name => {
  let fullName = name.split(' ');
  let iconLetters =
    fullName && fullName.length > 0
      ? fullName[0].substring(0, 1).toUpperCase()
      : 'U';

  if (fullName.length > 1) {
    iconLetters += fullName[1].substring(0, 1).toUpperCase();
  }
  return iconLetters;
};
