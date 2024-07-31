export function jsonToArray(json) {
    return Object.keys(json).map(key => {
      return {
        key: key,
        value: json[key]
      };
    });
  }
  