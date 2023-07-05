import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllFiles, uploadFile } from "../fileAction";
import { useDispatch } from "react-redux";
import { login_user } from "../../../Actions/userActions";
import { userSignOut } from "../../Login/loginAction";
import { useNavigate } from "react-router-dom";
import FileCard from "./fileCard";
import "./home.css";
import { Oval } from "react-loader-spinner";

const Home = () => {
  const user = useSelector((state) => state.User.loginInfo?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let file = null;
  const [userFiles, setUserFiles] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleFileUpload = async () => {
    try {
      setLoader(true);
      let dataToUpload = {
        file: file,
        id: user._id,
      };
      let data = await uploadFile(dataToUpload);

      setUserFiles(data);
      setLoader(false);
      alert("File uploded");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      let state = userSignOut();
      if (state) {
        dispatch(
          login_user({
            user: {
              firstname: null,
              lastname: null,
              email: null,
            },
            auth: null,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    file = e.target.files[0];
  };

  useEffect(() => {
    const handleFileData = async () => {
      try {
        let dataToBeSent = {
          id: user._id,
        };
        let data = await getAllFiles(dataToBeSent);
        console.log(data);
        setUserFiles(data);
      } catch (error) {
        console.log(error);
      }
    };
    handleFileData();
  }, [user._id]);

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
      <div className="flex w-full  p-2">
        <div className="mx-8">
          <div className="py-2">Upload files</div>
          <div>
            <input
              className="p-2 bg-light-accent dark:bg-dark-hover"
              type="file"
              onChange={(e) => {
                handleFileChange(e);
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
                    handleFileUpload();
                  }}
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        </div>
        <div className=" w-4/6 md:w-4/6   ">
          <div className="py-2">Your Files</div>
          <div className="fileDisplayBlock bg-light-accent dark:bg-dark-accent rounded  p-2 whitespace-pre-line flex flex-wrap">
            {userFiles.length > 0
              ? userFiles?.map((ele, index) => {
                  return (
                    <FileCard key={index} name={ele.fileName} url={ele.url} />
                  );
                })
              : "~Upload Files to Krayo.io~"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
