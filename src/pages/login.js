import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import img1 from "./images/jotform-logo-transparent-800x400.png";
import img2 from "./images/podo.png";
import vid1 from "./images/gettyimages-1297019186-640_adpp.mp4";
import axios from "axios";
import { reject } from "async";
import Password from "antd/lib/input/Password";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendLoginRequest = () => {
    if (username === "" || password === "") return;
    /*
    var bodyFromData = new FormData();
    bodyFromData.append("username", username);
    bodyFromData.append("password", password);
    
    axios({
      method: "post",
      url: "https://m-efe.jotform.dev/intern-api/user/login",
      data: bodyFromData,
    })
      .then(function (response) {
        const apiKey = response.data.content["appKey"];
        localStorage.setItem("apiKey", apiKey);
        window.location.pathname = "/forms";
      })
      .catch(function (err) {
        console.log(err);
      });
      */

    localStorage.setItem("apiKey", "c9058ea723befc280bdb13b7e542c321");
    window.location.pathname = "/forms";
  };

  return (
    <div>
      <div className="login-video">
        <video autoPlay loop muted>
          <source src={vid1} type="video/mp4" />
        </video>
      </div>
      <div className="login-header">
        <img src={img1} alt="" width="700" height="400" />
      </div>
      <div className="login-header2">
        <img src={img2} width="50" height="50" />
      </div>
      <div className="log">
        <Form name="basic">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              variant="btn btn-success"
              type="primary"
              htmlType="submit"
              className="submit-button"
              onClick={() => sendLoginRequest()}
            >
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
