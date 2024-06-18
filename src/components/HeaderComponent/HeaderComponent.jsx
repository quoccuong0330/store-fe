import React, { useEffect, useState } from "react";
import { Col, Image, Popover } from "antd";
import {
  WrapperAccount,
  WrapperHeader,
  WrapperLinkTextHeader,
  WrapperPopover,
  WrapperPopoverItem,
  WrapperTextHeader,
} from "./styles";
import Search from "antd/es/input/Search";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../services/UserService";
import { resetUser } from "../../redux/slices/userSlices";
import { useNavigate } from "react-router-dom";
import { updateSearch } from "../../redux/slices/productSlices";

const HeaderComponent = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [search, setSearch] = useState("");

  const handleLogOut = async () => {
    const res = await logOutUser();
    if (res?.status === "OK") {
      localStorage.removeItem("access_token");
      dispatch(resetUser());
      navigate("/");
    }
  };

  const { isShowSearch, isShowCart } = props;

  useEffect(() => {
    setName(user?.name ?? user?.email);
    setAvatar(user?.avatar);
  }, [user]);

  const contentPopover = (
    <WrapperPopover>
      <WrapperPopoverItem
        onClick={() => {
          navigate("/profile-user");
        }}
      >
        Thong tin tai khoan
      </WrapperPopoverItem>
      {user.isAdmin && (
        <WrapperPopoverItem
          onClick={() => {
            navigate("/system/admin");
          }}
        >
          Quản lý hệ thống
        </WrapperPopoverItem>
      )}
      <WrapperPopoverItem onClick={handleLogOut}>Dang xuat</WrapperPopoverItem>
    </WrapperPopover>
  );


  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
    dispatch(updateSearch({ search: e.target.value }));
  };

  return (
    <div>
      <WrapperHeader gutter={16}>
        <Col span={6} style={{ alignItems: "center", display: "flex" }}>
          <WrapperTextHeader>
            <Link href="/" style={{ color: "#fff" }}>
              RETURN449
            </Link>
          </WrapperTextHeader>
        </Col>
        <Col span={12} style={{ display: "flex", alignItems: "center" }}>
          {isShowSearch && (
            <Search
              placeholder="Find your product"
              enterButton="Search"
              allowClear
              onChange={(e) => {
                handleOnChangeSearch(e);
              }}
              onSearch={() => {}}
              value={search}
            />
          )}
        </Col>
        <Col span={6}>
          <WrapperAccount>
            {!avatar ? (
              <UserOutlined style={{ fontSize: "30px" }} />
            ) : (
              <Image
                preview={false}
                src={avatar}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
            <div style={{ marginRight: "12px" }}>
              {user.name === "" ? (
                <>
                  <WrapperLinkTextHeader href="/sign-in">
                    {"Dang nhap / Dang ki"}
                  </WrapperLinkTextHeader>
                </>
              ) : (
                <Popover
                  content={contentPopover}
                  trigger="click"
                  style={{ padding: "0 !important" }}
                >
                  <div style={{ cursor: "pointer" }}>{name}</div>
                </Popover>
              )}
            </div>
            {isShowCart && (
              <div>
                <ShoppingCartOutlined style={{ fontSize: "30px" }} />
                <WrapperLinkTextHeader>Gio hang</WrapperLinkTextHeader>
              </div>
            )}
          </WrapperAccount>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
