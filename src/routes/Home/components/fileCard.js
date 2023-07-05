import React, { useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const FileCard = ({ name, url }) => {
  const [loader, setLoader] = useState(false);

  const downloadFile = async () => {
    console.log(url);
    let response = await axios.get(url, { responseType: "blob" });
    console.log(response);

    const href = URL.createObjectURL(response.data);

    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", name.split("%")[1]);

    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    setLoader(false);
  };

  return (
    <div className=" bg-light-call-sec w-3/12  h-2/5 mx-10 my-3 rounded p-2 text-center">
      <div
        className=" cursor-pointer"
        onClick={() => {
          downloadFile();
        }}
      >
        <div className="text-light-accent dark:text-dark-accent">
          {loader ? (
            <div className=" flex justify-center w-full p-2">
              <Oval color="#5063F0" height={30} width={30} />
            </div>
          ) : (
            <div className="flex justify-center my-5">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                fill="currentColor"
                class="bi bi-file-earmark-arrow-down-fill"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z" />{" "}
              </svg>
            </div>
          )}
        </div>
        <div className="text-light-accent dark:text-dark-accent">
          File :{name.split("%")[1]}
        </div>
      </div>
    </div>
  );
};

export default FileCard;
