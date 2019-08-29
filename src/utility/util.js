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

export const fromJSON = resp => {
  if (!resp) {
    return null;
  }
  return Object.keys(resp).map(key => ({
    id: key,
    ...resp[key],
  }))[0];
};

export const fromJSONList = array => {
  return array.map(it => fromJSON(it));
};
