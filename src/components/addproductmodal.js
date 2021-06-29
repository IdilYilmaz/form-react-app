import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import axios from "axios";
import MyProducts from "../pages/myproducts";

const AddProductModal = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

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

  const sendAddProductRequest = () => {
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
        "/product",
      data: bodyFromData,
    })
      .then(function (response) {
        console.log(response);
        props.updateState(response.data.content);
      })
      .catch(function (err) {
        console.log(err);
      });
      setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={showModal} className="add-product-but">
        Add New Product
      </Button>
      <Modal
        title="Add New Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button onClick={() => sendAddProductRequest()}>
            SUBMIT
          </Button>,
        ]}
      >
        <Form name="basic">
          <Form.Item className="add_frm_item"
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
          <Form.Item label="Description" name="description" className="add_frm_item">
            <Input
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Price" name="price" className="add_frm_item">
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

export default AddProductModal;
