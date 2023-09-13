"use client";

import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);

    const data = {
      name: String(event.target.name.value),
      email: String(event.target.email.value),
      message: String(event.target.message.value),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Message sent successfully");
      setLoading(false);
      // reset the form
      event.target.name.value = "";
      event.target.email.value = "";
      event.target.message.value = "";
    }
    if (!response.ok) {
      console.log("Error sending message");
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <div className="w-2/8 flex flex-col ">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div className="w-3/8 flex flex-col">
          <label className=" text-white-300" htmlFor="name">
            Овог
          </label>
          <input
            type="text"
            minLength={3}
            maxLength={150}
            required
            className="p-4 bg-white-20 border border-white-10 "
            autoComplete="off"
            id="firstname"
          />
        </div>
        <div className="w-3/8 flex flex-col ">
          <label className="text-white-300" htmlFor="email">
            Нэр
          </label>
          <input
            type="text"
            minLength={5}
            maxLength={150}
            required
            className=" p-4 bg-white-50 border border-white-100 "
            autoComplete="off"
            id="lastname"
          />
        </div>
      </div>
      <div>
        <label className="text-white-800 mt-40" htmlFor="message">
          Хаяг
        </label>
        <textarea
          rows={4}
          required
          minLength={10}
          maxLength={500}
          name="message"
          className="w-full p-4 bg-white-50 border border-white-100 "
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="w-2/5 flex flex-col">
          <label className=" text-white-300" htmlFor="name">
            Утасны хаяг
          </label>
          <input
            type="number"
            minLength={3}
            maxLength={150}
            required
            className="p-4 bg-white-20 border border-white-10 "
            autoComplete="off"
            id="phone"
          />
        </div>
        <div className="w-2/5 flex flex-col">
          <label className="text-white-300" htmlFor="email">
            И-майл хаяг
          </label>
          <input
            type="email"
            minLength={5}
            maxLength={150}
            required
            className=" p-4 bg-white-50 border border-white-100 "
            autoComplete="off"
            id="email"
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <button
          type="submit"
          disabled={loading}
          style={{ backgroundColor: "#fdb730" }}
        >
          Илгээх
        </button>
      </div>
    </form>
  );
}
