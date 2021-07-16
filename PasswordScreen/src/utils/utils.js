import { getAuthToken } from "./storage";

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const isLogin = () => {
  const userMetaData = getAuthToken();
  if (userMetaData) {
    return true;
  }
  return false;
};

const utils = { 
  isLogin,
};

export default utils;
