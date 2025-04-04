"use client";

import axios from "axios";

const base_url = "http://localhost:4000";

import React, { useEffect, useState } from "react";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { CldImage, CldUploadWidget } from "next-cloudinary";
// import useLocalStorage from "react-use-localstorage";
import Image from "next/image";
import { data } from "autoprefixer";
import { getDocuments, updateDocuments } from "@/actions/user/auth";
import toast from "react-hot-toast";

const page = () => {
  const [imageUrl, setImageUrl] = useState([]);
  const [sucess, setSucess] = useState(false);
  const [image, setImage] = useState({
    publicId: "",
    width: 0,
    height: 0,
    secureURL: "",
  });

  const addDocument = async (url) => {
    const response = await updateDocuments(url);
    if (response.result) {
      console.log(response.result);
    }
  };

  const onUploadSuccessHandler = (result) => {
    const newImage = {
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    };
    if (newImage) {
      //put newImage.secureURL in database
      addDocument(newImage.secureURL);
      setImageUrl((prevImageUrl) => [...prevImageUrl, newImage.secureURL]);
    }
  };

  useEffect(() => {
    const getDocs = async () => {
      const response = await getDocuments();
      if (response.result) {
        setImageUrl(response.documents);
      } else {
        console.log("error");
      }
    };
    getDocs();
  }, []);

  return (
    <div className=" bg-blue-50 h-screen w-[85vw] flex overflow-auto flex-row">
      <div className="p-5 h-full  text-wrap w-[20%]">
        <div className=" h-full  bg-white rounded-lg shadow-md">
          <h4 className="text-black-300 text-xl font-bold flex justify-center items-center pt-3 ">
            Upload Documents
          </h4>
          <div className="flex flex-col justify-center items-center m-3  border-grey-300 border-2 w-[90%]  rounded-lg mt-10  hover:shadow-md transition cursor-pointer ">
            <div className="h-[20rem] flex items-center justify-center rounded-lg px-5 flex-col w-full bg-grey-100">
              <CldUploadWidget
                uploadPreset="jsm_caretakr"
                onSuccess={onUploadSuccessHandler}
              >
                {({ open }) => {
                  return (
                    <NoteAddIcon
                      fontSize="large"
                      className="text-3xl"
                      onClick={() => open()}
                    />
                  );
                }}
              </CldUploadWidget>
              <p className=" mt-2">Click here to upload data</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-[80%] p-5 pl-2 overflow-auto ">
        <div className=" bg-white h-full rounded-lg p-2">
          <h4 className="text-black-300 text-xl font-bold flex justify-center items-center pt-3 ">
            Your Documents:
          </h4>

          {true && (
            <div className=" grid grid-cols-3 grid-flow-row gap-5  p-[2rem]">
              {imageUrl.map((url, index) => (
                <div
                  key={index}
                  className="cursor-pointer overflow-hidden rounded-[10px]"
                >
                  <CldImage
                    key={index}
                    cloudName="dcnpnyqvb"
                    className="cursor-pointer overflow-hidden rounded-lg w-full"
                    width="200"
                    height="120"
                    src={url}
                    sizes="100vw"
                    alt="Description of my image"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
