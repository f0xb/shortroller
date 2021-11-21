const urlReducer = (
  state = { url: null, loading: false, success: null, error: null },
  action
) => {
  switch (action.type) {
    case "SHORTEN_URL_SUBMIT":
      return { loading: true };
    case "SHORTEN_URL_SUCCESS":
      return { url: action.payload.url, loading: false, success: true };
    case "SHORTEN_URL_FAIL":
      return { error: action.payload.error, loading: false, success: false };
    case "URL_SHORTEN_RESET":
      return { ...action.payload, loading: false, success: null, error: null };
    case "FETCH_STATS":
      return { ...action.payload };
    default:
      return state;
  }
};

export default urlReducer;
