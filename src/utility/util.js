export const camelize = str => {
  return str
    .split(/\s+/)
    .map(word => {
      if (word.length > 1)
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
      else {
        return word.toLowerCase();
      }
    })
    .join(" ");
};
