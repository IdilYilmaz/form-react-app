import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import axios from "axios";
import img4 from "./images2/389-3895405_png-file-edit-icon-circle-clipart.png";
import editicon from "../pages/images/edit_icon.png";

const EditProductModal = ({ product, updateState }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    console.log("SHOW MODAL");
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const sendEditProductRequest = () => {
    console.log("Edit Product Request is Sent");

    if (name === "") return;

    var bodyFromData = new FormData();
    bodyFromData.append("apiKey", localStorage.getItem("apiKey"));
    bodyFromData.append("name", name);
    bodyFromData.append("description", description);
    bodyFromData.append("price", price);

    console.log(name + " " + description + " " + price);

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

  return (
    <>
      {/*<Button type="dashed" onClick={showModal} className="edit-but2">
        Edit Product
  </Button>*/}
      <img src={editicon} onClick={showModal} width="25px" height="25px"></img>
      <Modal
        title="Edit Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button onClick={() => sendEditProductRequest()}>SUBMIT</Button>,
        ]}
      >
        <Form
          name="basic"
          initialValues={{
            ["name"]: name,
            ["description"]: description,
            ["price"]: price,
          }}
        >
          <Form.Item
            className="pro-frm"
            label="Product Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter the name of the product!",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            className="desc-frm"
          >
            <Input
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Price" name="price" className="but-frm">
            <Input
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProductModal;
