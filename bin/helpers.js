export function generateString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function convertAsArray(data) {
  let response;

  if (typeof data === 'string') {
    response = data.split(',');
  } else if (Array.isArray(data)) {
    response = data;
  } else {
    response = [];
  }

  return response;
}
