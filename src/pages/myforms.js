import React, { useEffect, useState, Component } from "react";
import { Form, Input, Button, Checkbox, Divider } from "antd";
import history from "./history";
import { Menu } from "antd";
import axios from "axios";
import {
  AppstoreOutlined,
  MailOutlined,
  PropertySafetyFilled,
  SettingOutlined,
} from "@ant-design/icons";
import vid1 from "./images/istockphoto-1306067261-640_adpp_is.mp4";
import { render } from "@testing-library/react";
import { List, Avatar } from "antd";
import { Table, Tag, Space } from "antd";
import img1 from "./images/podo.png";
import img2 from "./images/white-abstract-wallpaper_23-2148830027.jpg";
import img3 from "./images/icon-for-editing-14.jpg";

var wait = false;
const { SubMenu } = Menu;

class MyForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dt: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleFormItem = this.handleFormItem.bind(this);
    this.renderListButton = this.renderListButton.bind(this);
  }

  handleFormItem(item) {
    console.log(item.id + " " + item.isProductForm);

    if (!item.isProductForm) {
      var bodyFromData = new FormData();
      bodyFromData.append("apiKey", localStorage.getItem("apiKey"));

      axios({
        method: "post",
        url:
          "https://m-efe.jotform.dev/intern-api/form/" +
          item.id +
          "/product-list",
        data: bodyFromData,
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    this.props.history.push({
      pathname: "/products",
      state: {
        formId: item.id,
        isProductForm: item.isProductForm,
        formTitle: item.title,
        formURL: item.url,
      },
    });
  }

  renderListButton(item) {
    if (item.isProductForm) {
      return (
        <Button onClick={() => this.handleFormItem(item)} type="link" className="edit-but">
          EDIT PRODUCT LIST
        </Button>
      );
    } else {
      return (
        <Button onClick={() => this.handleFormItem(item)} type="link" className="add-product-but">
          ADD PRODUCT LIST
        </Button>
      );
    }
  }

  handleClick(e) {
    console.log("click", e);
  }

  async componentDidMount() {
    try {
      var response = await axios.get(
        "https://m-efe.jotform.dev/intern-api/forms",
        {
          params: {
            apiKey: localStorage.getItem("apiKey"),
          },
        }
      );
      this.setState({ dt: response.data.content });
      console.log(this.state.dt);
      wait = true;
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div>
        <div className="form-img" >
          <img src={img2}  width="1278" height="609">
            </img>
        </div>

        <div className="frm" style={{ width: "53%", height: "100%" }}>
          {this.state.dt.map((item, i) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                className="lst"
                avatar={<Avatar shape="square" size={28} src={img3} className="avatar-icon" />}
                title={<a href={item.url} target="_blank">{item.title}</a>}
              />
              {this.renderListButton(item)}
            </List.Item>
          ))}
        </div>
      </div>
    );
  }
}

export default MyForms;