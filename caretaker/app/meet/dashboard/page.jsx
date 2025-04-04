"use client";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [room, setRoom] = useState("");
  const handleCode = (e) => {
    setRoom(e.target.value);
  };
  return (
    <div className="flex justify-center mt-[4rem]">
      <div>
        <div>
          <h1 className="text-2xl ml-[1rem] text-black font-bold">
            Join Room to Chat with Patient
          </h1>
          <input
            onChange={handleCode}
            className="mt-[2rem] ml-[6rem] bg-gray-200 text-black h-[3rem] p-[1rem] rounded-lg"
            placeholder="Enter your code to enter"
            type="text"
          />
          <br />
          <Link href={`/conversations/${room}`}>
            <button className="mt-[2rem] ml-[10rem] h-[2rem] bg-blue-500 p-3 rounded-sm text-white flex items-center justify-center">
              Join Call
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
