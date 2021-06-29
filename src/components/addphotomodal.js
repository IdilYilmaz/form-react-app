import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import axios from "axios";
import MyProducts from "../pages/myproducts";
import img6 from "./images2/add-camera-icon-icon-add-11553485583calilemiyg.png";

const AddPhotoModal = ({ product, updateState }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [base64Image, setBase64Image] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // console.log(base64Image);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const sendAddPhotoRequest = () => {
    if (base64Image === "") return;

    console.log("ADD PHOTO REQUEST IS SENT");

    const images = product.images;
    let newImageList = "";

    if (images.length <= 2) {
      newImageList = '["' + base64Image + '"]';
    } else {
      newImageList =
        images.substring(0, images.length - 1) + ',"' + base64Image + '"]';
    }

    var bodyFromData = new FormData();
    bodyFromData.append("apiKey", localStorage.getItem("apiKey"));
    bodyFromData.append("images", newImageList);

    axios({
      method: "post",
      url:
        "https://m-efe.jotform.dev/intern-api/form/" +
        localStorage.getItem("formId") +
        "/products/" +
        product.pid +
        "/edit",
      data: bodyFromData,
    })
      .then(function (response) {
        console.log(response);
        updateState(response.data.content);
      })
      .catch(function (err) {
        console.log(err);
      });

    setIsModalVisible(false);
  };

  const getBase64Url = (file) => {
    console.log(file);

    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64 = reader.result;
        //console.log(base64);
        setBase64Image(base64);
      };
      reader.onerror = (error) => {
        console.log("Error: " + error);
      };
    }
  };

  return (
    <>
      <Button type="dashed" onClick={showModal} className="photo-but">
        Add New Photo
      </Button>
      <Modal
        title="Add New Photo"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={() => sendAddPhotoRequest()}>
            SAVE PHOTO
          </Button>,
        ]}
      >
        <input
          id="image"
          type="file"
          onChange={(event) => getBase64Url(event.target.files[0])}
          accept="image/*"
        />
      </Modal>
    </>
  );
};

export default AddPhotoModal;
