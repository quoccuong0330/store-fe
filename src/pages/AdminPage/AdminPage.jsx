import React, { useState } from "react";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
const items = [
  {
    label: "User",
    icon: <UserOutlined />,
    children: [
      {
        key: 1,
        label: "List of users",
      },
    ],
  },
  {
    label: "Product",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: 3,
        label: "List of products",
      },
    ],
  },
];

const renderPage = (key) => {
  switch (key) {
    case "1":
      return <AdminUser />;
    case "3":
      return <AdminProduct />;
    default:
  }
};

const AdminPage = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const onClick = (e) => {
    setSelectedKey(e.key);
  };
  return (
    <div>
      <HeaderComponent isShowSearch={false} isShowCart={false} />
      <div style={{ display: "flex" }}>
        <Menu
          onClick={onClick}
          style={{
            width: 256,
            height: "100vh",
            borderInlineEnd: " 1px solid rgba(5, 5, 5, 0.2)",
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["user"]}
          mode="inline"
          items={items}
        />
        <div style={{ width: "100%", margin: "20px" }}>
          {renderPage(selectedKey)}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
