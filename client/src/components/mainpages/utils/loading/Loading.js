import React from "react";
import "./loading.css";

function Loading() {
  return (
    <>
      <div className=" flex justify-center items-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
      </div>
      <div className="text-center mt-2">Please wait a few minutes...!</div>
    </>
  );
}

export default Loading;
