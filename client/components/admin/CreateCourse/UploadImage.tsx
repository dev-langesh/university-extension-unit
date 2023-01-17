import React, { useRef, useState } from "react";

export default function UploadImage() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [url, setUrl] = useState<string>("");

  function chooseImage() {
    fileRef.current?.click();
  }

  function createImageURL(e: React.ChangeEvent<HTMLInputElement>) {
    const files: any = e.target.files;

    const file = files[0];

    setUrl(URL.createObjectURL(file));
  }

  return (
    <section className="flex flex-col items-center">
      <input
        onChange={createImageURL}
        className="hidden"
        ref={fileRef}
        name="image"
        type="file"
      />

      <div
        className={`h-32 w-full ${
          url ? "bg-white" : "bg-gray-200"
        } flex items-center justify-center`}
      >
        {url ? (
          <img className="w-full h-full object-contain" src={url} alt="" />
        ) : (
          <button
            onClick={chooseImage}
            className="bg-indigo-600 text-white px-2 py-1"
          >
            Elegir imagen{" "}
          </button>
        )}
      </div>

      {url && (
        <button
          onClick={chooseImage}
          className="bg-indigo-600 text-white px-2 mt-2"
        >
          Cambio
        </button>
      )}
    </section>
  );
}
