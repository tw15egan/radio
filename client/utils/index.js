export function checkHttpStatus(response) {
  let result = '';
  if (response.status >= 200 && response.status < 300) {
    result = response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  return result;
}

export function parseJSON(response) {
  return response.json();
}
