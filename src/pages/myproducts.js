import React, { useEffect, useState, Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import history from "./history";
import { Menu, Table, Tag, Space, Modal } from "antd";
import axios from "axios";
import {
  AppstoreOutlined,
  MailOutlined,
  PropertySafetyFilled,
  SettingOutlined,
} from "@ant-design/icons";
import { render } from "@testing-library/react";
import { List, Avatar } from "antd";
import AddProductModal from "../components/addproductmodal";
import EditProductModal from "../components/editproductmodal";
import DeleteProductModal from "../components/deleteproductmodal";
import AddPhotoModal from "../components/addphotomodal";
import img2 from "./images/white-abstract-wallpaper_23-2148830027.jpg";
import img3 from "./images/podo.png";




var wait = false;
const { SubMenu } = Menu;

class MyProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keko: [],
      showAddProductModal: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(products) {
    this.setState({ keko: products });
  }

  handleClick(e) {
    console.log("click", e);
  }

  async componentDidMount() {
    const formId = this.props.location.state.formId;
    const isProductForm = this.props.location.state.isProductForm;
    localStorage.setItem("formId", formId);

    console.log(localStorage.getItem("apiKey"));

    const url =
      "https://m-efe.jotform.dev/intern-api/form/" + formId + "/products";
    try {
      var response = await axios.get(url, {
        params: {
          apiKey: localStorage.getItem("apiKey"),
        },
      });
      this.setState({ keko: response.data.content });
      console.log(this.state.keko);

      wait = true;
    } catch (err) {
      console.error(err);
    }
  }

  renderImages(images) {
    const tempList = images.split('"');
    const imageList = tempList.filter(function (value) {
      return (value != "[") & (value != "]") & (value != ",");
    });
    console.log(imageList);

    if( imageList.length > 0)
      return <img height={30} src={imageList[0]}/>
    else
      return 'No image found';

  }

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      /*{
        title: "Images",
        dataIndex: "images",
        key: "images",
        render: (text, record) => (
          <Space size="middle">
            {this.renderImages(record.images)}</Space>
        ),
      },*/
      {
        title: "",
        dataIndex: "buttons",
        key: "buttons",
        render: (text, record) => (
          <Space size="middle">
            <EditProductModal product={record} updateState={this.updateState} />
            <DeleteProductModal
              product={record}
              updateState={this.updateState}
            />
            <AddPhotoModal updateState={this.updateState} />
          </Space>
        ),
      },
    ];

    return (
      <div>
        <div className="form-img" >
          <img src={img2}  width="1278" height="609">
            </img>
        </div>
        <div className="login-header3">
        <img src={img3} width="70" height="70" />
      </div>

        <div className="frm" style={{ width: "65%", height: "100%" }}>
          <a href={this.props.location.state.formURL} target="_blank"><h1><i><b>FORM TITLE: {this.props.location.state.formTitle}</b></i></h1></a>
          <br />
          --------
          <div className="tbl-pro2">
          <Table className="tbl-pro"
            dataSource={this.state.keko}
            columns={columns}
            rowKey="pid"
            pagination={false}
          />
          </div>
          {/*<Button onClick={ () => { this.setState({showAddProductModal: true}) } } >ADD NEW PRODUCT</Button>*/}
          {/*<view>{(this.state.showAddProductModal === true) ? (this.renderAddProductModal()) : '' }</view>*/}
          <AddProductModal updateState={this.updateState} />
        </div>
      </div>
    );
  }
}

export default MyProducts;
