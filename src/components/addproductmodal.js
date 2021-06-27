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
      <Button type="dashed" onClick={showModal} className="edit-but2">
        Add New Product
      </Button>
      <Modal
        title="Add New Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { color:"black"} }}
        okButtonProps={{ style: { color:"black", backgroundColor:"gainsboro"} }}
      >
        <Form name="basic">
          <Form.Item className="pro-frm"
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
          <Form.Item label="Description" name="description" className="desc-frm">
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
          <Form.Item>
            <Button className="but-sub"
              type="primary"
              htmlType="submit"
              onClick={() => {
                sendAddProductRequest();
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProductModal;
