import { axiosInstance } from "../../Utilities/axiosHelper";

import {
  getTokenCookie,
  getAuthHeader,
  removeTokenCookie,
} from "../../Utilities/authTools.js";

export const LoginGoogle = async () => {
  const response = await axiosInstance.post("/auth/signinWithGoogle");

  return response.data;
};

export const userIsAuth = async () => {
  if (!getTokenCookie()) {
    return false;
  } else {
    const user = await axiosInstance.get("/auth/isauth", getAuthHeader());

    return user;
  }
};

export const userSignOut = async () => {
  await removeTokenCookie();

  return true;
};
