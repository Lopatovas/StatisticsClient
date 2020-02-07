
import CONFIG from './config';

const apiCall = (url, passedParams = { method: 'GET' }) => new Promise((resolve, reject) => {
  const params = {
    ...passedParams,
  };
  fetch(`${CONFIG.MAIN_ENDPOINT}${url}`, params)
    .then((resp) => {
      try {
        resolve(resp.json());
      } catch (e) { reject(e); }
    })
    .catch((e) => reject(e));
});

export default { apiCall, CONFIG };
