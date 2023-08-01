const DEFAULT_METHOD = 'POST';

const getData = (url, onSuccess, onError) => {
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      onSuccess(result);
    })
    .catch(() => {
      onError();
    });
};

const sendData = (url, onSuccess, onError, body, method = DEFAULT_METHOD) => {
  fetch(url, {
    method,
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      onError();
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
