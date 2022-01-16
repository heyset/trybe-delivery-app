const parseResponseJson = (response) => response.json();

const throwIfError = (result) => {
  if (result.error) {
    throw result.error;
  }
  return result;
};

export const post = ({ url, body }) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
})
  .then(parseResponseJson)
  .then(throwIfError);

export const get = ({ url }) => fetch(url, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
})
  .then(parseResponseJson)
  .then(throwIfError);
