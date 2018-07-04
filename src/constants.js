const API_ENDPOINT = process.env.REACT_APP_KAZNET_ENDPOINT;
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

const dafaultAppState = {
  currentPage: 1,
  pageLinks: {
    first: null,
    last: null,
    prev: null,
    next: null
  }
};

export { API_ENDPOINT, API_TOKEN, defaultPageState };
