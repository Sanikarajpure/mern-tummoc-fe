import { axiosInstance } from "../../Utilities/axiosHelper";

import { getAuthHeader } from "../../Utilities/authTools.js";

export const getAllFiles = async (data) => {
  const response = await axiosInstance.get(
    `/file/getAllFiles?id=${data.id}`,
    getAuthHeader()
  );

  return response.data.result;
};

export const uploadFile = async (data) => {
  const formdata = new FormData();
  formdata.append("file", data.file);
  formdata.append("id", data.id);
  const response = await axiosInstance.post(
    "/file/uploadFile",
    formdata,
    getAuthHeader()
  );

  return response.data;
};
