import React from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const InputForm = ({ isSignUp, ...props }) => {
  return (
    <div>
      <Input
        placeholder="abc@gmail.com"
        style={{ marginBottom: "10px" }}
        value={props.email}
        onChange={(e) => props.handleOnChangeEmail(e)}
      ></Input>
      <Input.Password
        placeholder="Password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        style={{ marginBottom: "10px" }}
        value={props.password}
        onChange={(e) => props.handleOnChangePassword(e)}
      />
      {isSignUp && (
        <Input.Password
          placeholder="Confirm password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ marginBottom: "10px" }}
          value={props.confirmPassword}
          onChange={(e) => props.handleOnChangeConfirmPassword(e)}
        />
      )}
    </div>
  );
};

export default InputForm;
