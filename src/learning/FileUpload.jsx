import React, { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState(null);

  console.log("file", file);

  return (
    <div className="flex flex-1 flex-col justify-center items-center h-screen">
      <h1 className="text-2xl">FileUpload Title</h1>
      <label htmlFor="fileinput"> Image preview </label>
      <img src={file} alt="" className="h-64 w-64" />
      <input
        type="file"
        className="mt-5"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          console.log("file", file);
          setFile(file);

          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setFile(reader.result);
          };
        }}
      />
    </div>
  );
}
