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
    
    <div className="product-img5">
        <img src={img5} width="40" height="40" />
      </div>
      <Button type="dashed" onClick={showModal} className="rem-but">
        Remove
      </Button>
      <Modal
        title="Delete Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { color:"black"} }}
        okButtonProps={{ style: { color:"black", backgroundColor:"gainsboro"} }}
      >
        Are you sure to remove this product?
      </Modal>
    </>
  );
};

export default DeleteProductModal;
