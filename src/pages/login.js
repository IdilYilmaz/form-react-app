import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import img1 from "./images/fast-inventory_banner.png";
import img2 from "./images/Group_1835.png";
import vid1 from "./images/gettyimages-1297019186-640_adpp.mp4";
import axios from "axios";
import { reject } from "async";
import Password from "antd/lib/input/Password";
import login from "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendLoginRequest = () => {
    if (username === "" || password === "") return;

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
        localStorage.setItem("name", response.data.content["name"]);
        localStorage.setItem("avatarUrl", response.data.content["avatarUrl"]);
        console.log(response);
        window.location.pathname = "/forms";
      })
      .catch(function (err) {
        console.log(err);
      });

    
   /*
    localStorage.setItem("apiKey", "c9058ea723befc280bdb13b7e542c321");
    window.location.pathname = "/forms";
    */
    
  };

  return (
    <div class="login-wrap-2" style={{paddingTop:"60px"}}>
    <div class="login-wrap">
      <div class="login-html">
        <input id="tab-1" type="radio" name="tab" class="sign-in" checked />
        <label for="tab-1" class="tab"></label>
        <input id="tab-2" type="radio" name="tab" class="sign-up" />
        <label for="tab-2" class="tab" display="none"></label>
        <div class="login-form">
          <div class="sign-in-htm">
            <img src={img2} width="200" height="40" className="im" />
            <p style={{ marginBottom: "0" }}>
              <h2 style={{ color: "#0A1551", marginTop: "12px" }}>Fast Inventory Application</h2>
            </p>
            <p style={{ color: "#0A1551", fontWeight: "normal", paddingBottom: "12px" }}>
              Collect response, payment and signature with your forms
            </p>

            <div class="group">
              <label for="user" class="label">
                Username
              </label>
              <input
                id="user"
                type="text"
                class="input"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div class="group">
              <label for="pass" class="label">
                Password
              </label>
              <input
                id="pass"
                type="password"
                class="input"
                required
                data-type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="group">
              <input
                id="check"
                type="checkbox"
                class="check"
                valuPropName="checked"
              />
              <label for="check" style={{ color: "#0A1551", display:"flex" }}>
                <span
                  class="icon"
                  style={{
                    backgroundColor: "rgba(128, 128, 128, 0.24)",
                    color: "#0A1551",
                  }}
                ></span>{" "}
                Remember Me{" "}
              </label>
            </div>
            <div class="group">
              <input
                type="submit"
                class="button"
                value="Sign In"
                onClick={() => sendLoginRequest()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
