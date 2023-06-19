import { axiosInstance } from "../../Utilities/axiosHelper";

import { getAuthHeader } from "../../Utilities/authTools.js";

export const getFileContents = async () => {
  const response = await axiosInstance.get("/file/read", getAuthHeader());

  return response.data;
};

export const writeToFile = async (text) => {
  const response = await axiosInstance.post(
    "/file/write",
    {
      text,
    },
    getAuthHeader()
  );

  return response.data;
};
