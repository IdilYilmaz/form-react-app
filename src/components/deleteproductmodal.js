import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import axios from "axios";
import img5 from "./images2/remove-icon-png-7131.png";

const DeleteProductModal = ({ product, updateState }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    console.log("SHOW MODAL");
    setIsModalVisible(true);
  };

  const handleOk = () => {
    sendDeleteProductRequest();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const sendDeleteProductRequest = () => {
    console.log("Delete Product Request is Sent");

    axios({
      method: "delete",
      url:
        "https://m-efe.jotform.dev/intern-api/form/" +
        localStorage.getItem("formId") +
        "/products/" +
        product.pid,
      params: {
        apiKey: localStorage.getItem("apiKey"),
      },
    })
      .then(function (response) {
        console.log(response);
        updateState(response.data.content);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <Button type="dashed" onClick={showModal} className="rem-but">
        Remove
      </Button>
      <Modal
        title="Delete Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[<Button onClick={() => handleOk()}>OK</Button>]}
      >
        Are you sure to remove this product?
      </Modal>
    </>
  );
};

export default DeleteProductModal;
