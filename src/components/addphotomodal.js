import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import axios from "axios";
import MyProducts from "../pages/myproducts";
import img6 from "./images2/add-camera-icon-icon-add-11553485583calilemiyg.png";

const AddPhotoModal = ({ updateState }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const sendAddPhotoRequest = () => {
    console.log("ADD PHOTO REQUEST IS SENT");
  };

  return (
    <>
          <div className="product-img6">
        <img src={img6} width="40" height="40" />
      </div>
      <Button type="dashed" onClick={showModal} className="photo-but">
        Add New Photo
      </Button>
      <Modal
        title="Add New Photo"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { color:"black"} }}
        okButtonProps={{ style: { color:"black", backgroundColor:"gainsboro"} }}
      >
        <input type="file"  />
      </Modal>
    </>
  );
};

export default AddPhotoModal;
