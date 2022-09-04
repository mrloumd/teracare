import axios from 'axios';

const baseUrl = process.env.REACT_APP_ENV === 'development' ? 'http://192.168.5.165:5000/api' : 'http://192.168.5.171:5000/api';
// const baseUrl ='http://192.168.5.171:5000/api';

const handleSuccess = (response) => response.data;
// let getToken = JSON.parse(localStorage.getItem('token'));
// const { access_token, id_token } = response.headers;
// if (access_token && id_token) {
//   const new_token = {
//     ...getToken,
//     AccessToken: access_token,
//     IdToken: id_token,
//   };
//   localStorage.removeItem('token');
//   localStorage.setItem('token', JSON.stringify(new_token));
// }

const handleError = (error) => Promise.reject(error.response ? error.response : error);
// let counter = localStorage.getItem('error_counter');
// if (
//   error.request.responseType === 'arraybuffer' &&
//   error.response.data.toString() === '[object ArrayBuffer]'
// ) {
//   const err = JSON.parse(Buffer.from(error.response.data).toString('utf8'));
//   if (err.error && err.error.auto_logout) {
//     localStorage.setItem('error_counter', 1);
//     if (counter < 1) {
//       Modal.warning({
//         title: `Warning! ${err.error.message}`,
//         content: 'You will be forced to logout.',
//         onOk: () => {
//           localStorage.clear();
//           Modal.destroyAll();
//           sessionStorage.clear();
//           window.location = '/customer-portal';
//         },
//       });
//     }
//     throw err;
//   } else {
const handleHeaders = () => {
  const service = axios.create({
    baseURL: baseUrl,
    'Content-Type': 'application/json',
  });
  return service;
};

const ApiService = () => {
  const get = (path, params) => {
    const service = handleHeaders();
    return service.get(path, params);
  };
  const post = (path, body) => {
    const service = handleHeaders();
    return service.post(path, body);
  };
  const put = (path, body) => {
    const service = handleHeaders();
    return service.put(path, body);
  };
  const remove = (path) => {
    const service = handleHeaders();
    return service.delete(path);
  };

  return {
    get,
    post,
    put,
    remove,
  };
};
axios.interceptors.response.use(handleSuccess, handleError);

export const axiosBaseQuery = () => async ({
  url, method, data, params,
}) => {
  try {
    const result = await axios({
      url: `${baseUrl}${url}`,
      method,
      data,
      params,
    });

    return { data: result || null };
  } catch (axiosError) {
    const err = axiosError;

    return {
      error: err.data,
    };
  }
};

export default ApiService;
