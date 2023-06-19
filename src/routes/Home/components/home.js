import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getFileContents, writeToFile } from "../fileAction";
import { userSignOut } from "../../Login/loginAction";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const Home = () => {
  const user = useSelector((state) => state.User.loginInfo?.user);
  const navigate = useNavigate();
  const [fileData, setFileData] = useState("");
  const [textData, setTextData] = useState("");
  const [loader, setLoader] = useState(false);
  const handleFileOps = async () => {
    try {
      setLoader(true);
      let data = await writeToFile(textData);
      setFileData(data);
      setTextData("");
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      let state = userSignOut();
      if (state) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleFileData = async () => {
      try {
        let data = await getFileContents();
        setFileData(data);
      } catch (error) {
        console.log(error);
      }
    };
    handleFileData();
  }, []);

  return (
    <div className="text-light-call-sec dark:text-light-accent  items-center ">
      <div className="flex w-full  p-16">
        <div className="p-2 flex-1 text-center text-xl">
          Hello {user.firstName}
        </div>

        <div>
          {" "}
          <button
            className=" pointer bg-light-call-sec p-2  text-white rounded-md "
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex w-full justify-around p-8">
        <div>
          <div className="py-2">Write to the File</div>
          <div>
            <input
              className="p-2 bg-dark-accent dark:bg-white"
              type="text"
              value={textData}
              onChange={(e) => {
                setTextData(e.target.value);
              }}
            />
            <div>
              {loader ? (
                <div className=" flex justify-center w-full p-2">
                  <Oval color="#5063F0" height={30} width={30} />
                </div>
              ) : (
                <button
                  className=" pointer bg-whatsApp-green p-2 my-4 text-white rounded-md "
                  onClick={() => {
                    handleFileOps();
                  }}
                >
                  Write
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="  w-80 ">
          <div className="py-2">File contents</div>
          <div className="bg-dark-accent dark:bg-white h-80 p-2 whitespace-pre-line">
            {fileData ? fileData : "~Empty file~"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
