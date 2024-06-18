import { Button, Col, Row, notification, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  WrapperColCenter,
  WrapperForm,
  WrapperInput,
  WrapperLabel,
  WrapperRow,
  WrapperUpload,
} from "./style";
import { useSelector } from "react-redux";
import { updateUser } from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  const mutation = useMutationHooks((data, id) => updateUser(data, id));
  const { isSuccess, isPending, isError } = mutation;
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useCallback(
    (type) => {
      switch (type) {
        case "success":
          api[type]({
            message: "Notification",
            description: "Update information of user successfully",
          });

          break;
        case "error":
          api[type]({
            message: "Notification",
            description: "Update information of user failure",
          });
          break;
        default:
      }
    },
    [api]
  );

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setAvatar(user?.avatar);
    setPhone(user?.phone);
    setAddress(user?.address);
    // setPassword(user?.password);
    setId(user?.id);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      openNotificationWithIcon("success");
    } else if (isError) {
      openNotificationWithIcon("error");
    }
  }, [isError, isSuccess, openNotificationWithIcon]);

  const handleChangeInput = (type, value) => {
    switch (type) {
      case "avatar":
        setAvatar(value);
        break;
      case "name":
        setName(value);
        break;
      // case "password":
      //   setPassword(value);
      //   break;
      case "address":
        setAddress(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
    }
  };

  const handleChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const handleUpdateUser = async (type, value) => {
    const object = {};
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    object[type] = value.trim();

    mutation.mutate({ ...object, access_token, id });
  };

  return (
    <WrapperForm>
      <h2>Chinh sua ho so</h2>
      {contextHolder}
      <Row>
        <Col span={6}></Col>
        <WrapperColCenter span={12}>
          <LoadingComponent isLoading={isPending}>
            <div>
              <WrapperRow>
                <WrapperLabel htmlFor="email">Email: </WrapperLabel>
                <WrapperInput value={email} id="email" disabled />
                <Button type="primary" disabled>
                  Update
                </Button>
              </WrapperRow>
              <WrapperRow>
                <WrapperLabel htmlFor="avatar">Avatar: </WrapperLabel>
                <div
                  style={{
                    width: "300px",
                    marginRight: "12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <WrapperUpload maxCount={1} onChange={handleChangeAvatar}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </WrapperUpload>

                  {avatar && (
                    <Image
                      src={avatar}
                      style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <Button
                  type="primary"
                  onClick={() => handleUpdateUser("avatar", avatar)}
                >
                  Update
                </Button>
              </WrapperRow>
              <WrapperRow>
                <WrapperLabel htmlFor="name">Name: </WrapperLabel>
                <WrapperInput
                  onChange={(e) => {
                    handleChangeInput("name", e.target.value);
                  }}
                  id="name"
                  value={name}
                />
                <Button
                  type="primary"
                  onClick={() => handleUpdateUser("name", name)}
                >
                  Update
                </Button>
              </WrapperRow>
              {/* <WrapperRow>
                <WrapperLabel htmlFor="password">Password: </WrapperLabel>
                <WrapperInput
                  onChange={(e) => {
                    handleChangeInput("password", e.target.value);
                  }}
                  value={password}
                  id="password"
                />
                <Button type="primary">Update</Button>
              </WrapperRow> */}
              <WrapperRow>
                <WrapperLabel htmlFor="phone">Phone number: </WrapperLabel>
                <WrapperInput
                  onChange={(e) => {
                    handleChangeInput("phone", e.target.value);
                  }}
                  value={phone}
                  id="phone"
                />
                <Button
                  type="primary"
                  onClick={() => handleUpdateUser("phone", phone)}
                >
                  Update
                </Button>
              </WrapperRow>
              <WrapperRow>
                <WrapperLabel htmlFor="address">Address: </WrapperLabel>
                <WrapperInput
                  onChange={(e) => {
                    handleChangeInput("address", e.target.value);
                  }}
                  value={address}
                  id="address"
                />
                <Button
                  type="primary"
                  onClick={() => handleUpdateUser("address", address)}
                >
                  Update
                </Button>
              </WrapperRow>
            </div>
          </LoadingComponent>
        </WrapperColCenter>
        <Col span={6}></Col>
      </Row>
    </WrapperForm>
  );
};

export default ProfilePage;
