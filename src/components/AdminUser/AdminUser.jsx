/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import { Button, Form, Image, Input, Select, Space, notification } from "antd";
import {
  deleteUser,
  getAllUser,
  getDetailUser,
  updateUser,
} from "../../services/UserService";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import Modal from "antd/es/modal/Modal";
import Highlighter from "react-highlight-words";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { WrapperUpload } from "../../pages/ProfilePage/style";
import { WrapperModal } from "../AdminProduct/style";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { getBase64 } from "../../utils";

const AdminUser = () => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));

  //Set notification
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useCallback(
    (type, description) => {
      api[type]({
        message: "Notification",
        description: `${description}`,
      });
    },
    [api]
  );

  //Init data
  const initData = {
    name: "",
    isAdmin: false,
    email: "",
    phone: "",
    address: "",
    avatar: "",
  };
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [userDetail, setUserDetail] = useState(initData);
  const [rowSelect, setRowSelect] = useState("");

  const handleOpenModalDelete = () => {
    setIsModalOpenDelete(true);
  };

  const handleCloseModalDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleOpenModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const handleCloseModalEdit = () => {
    setIsModalOpenEdit(false);
  };

  //Anything for useMutation
  const updateUserMutation = useMutationHooks(async (data) => {
    const res = await updateUser(data);
    return res;
  });

  const deleteUserMutation = useMutationHooks(async (data) => {
    const res = await deleteUser(data);
    return res;
  });

  const {
    data: dataUpdateUser,
    isPending: isPendingUpdateUser,
    isSuccess: isSuccessUpdateUser,
    isError: isErrorUpdateUser,
  } = updateUserMutation;

  const {
    data: dataDeleteUser,
    isPending: isPendingDeleteUser,
    isSuccess: isSuccessDeleteUser,
    isError: isErrorDeleteUser,
  } = deleteUserMutation;

  const handleUpdateUser = () => {
    updateUserMutation.mutate(
      { access_token, ...userDetail, id: rowSelect },
      {
        onSettled: () => {
          refetchAllUser();
        },
      }
    );
  };

  //handle event table
  const handleDeleteUser = () => {
    deleteUserMutation.mutate(
      { access_token, id: rowSelect },
      {
        onSettled: () => {
          refetchAllUser();
        },
      }
    );
  };

  const handleChangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setUserDetail({ ...userDetail, avatar: file.preview });
  };

  const handleOnChangeInput = (e) => {
    setUserDetail({
      ...userDetail,
      [e.target.name]: e.target.value,
    });
  };

  //Anything init data for table
  const getAllUserQuery = async () => {
    const res = await getAllUser(access_token);
    return res.data ?? {};
  };

  const handleGetDetailUser = useCallback(async () => {
    const res = await getDetailUser(rowSelect, access_token);
    return res.data;
  }, [rowSelect]);

  //Anything for useQuery
  const { data: dataUserDetail, isLoading: isLoadingDetail } = useQuery({
    queryKey: ["id", rowSelect],
    queryFn: handleGetDetailUser,
    retry: 3,
    retryDelay: 1000,
    enabled: !!rowSelect,
  });

  const {
    data: dataAllUser,
    isSuccess: isSuccessAllUser,
    refetch: refetchAllUser,
    isLoading: isLoadingAllUser,
  } = useQuery({
    queryFn: getAllUserQuery,
    queryKey: ["user"],
    retry: 3,
    retryDelay: 1000,
  });

  let dataUser = [];
  if (dataAllUser) {
    dataUser = dataAllUser.map((item) => {
      return { ...item, key: item._id };
    });
  }

  //Anything for useEffect
  useEffect(() => {
    if (isSuccessAllUser && dataAllUser) {
      refetchAllUser();
    }
  }, [isSuccessAllUser, dataAllUser]);

  useEffect(() => {
    if (!dataUserDetail) return;
    setUserDetail(dataUserDetail);
  }, [rowSelect, dataUserDetail]);

  useEffect(() => {
    if (isSuccessUpdateUser && dataUpdateUser.status === "OK") {
      openNotificationWithIcon("success", dataUpdateUser.message);
    } else if (isSuccessUpdateUser && dataUpdateUser.status === "ERR") {
      openNotificationWithIcon("error", dataUpdateUser.message);
    } else if (isErrorUpdateUser) {
      openNotificationWithIcon("error", dataUpdateUser.message);
    }
    handleCloseModalEdit();
  }, [isSuccessUpdateUser, isErrorUpdateUser]);

  useEffect(() => {
    if (isSuccessDeleteUser && dataDeleteUser.status === "OK") {
      openNotificationWithIcon("success", dataDeleteUser.message);
    } else if (isSuccessDeleteUser && dataDeleteUser.status === "ERR") {
      openNotificationWithIcon("error", dataDeleteUser.message);
    } else if (isErrorDeleteUser) {
      openNotificationWithIcon("error", dataDeleteUser.message);
    }
    handleCloseModalDelete();
  }, [isSuccessDeleteUser, isErrorDeleteUser]);

  //Anything about search in table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const column = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      render: (key) => {
        if (key) {
          return <span>Admin</span>;
        } else {
          return <span>User</span>;
        }
      },
      filters: [
        {
          text: "Admin",
          value: true,
        },
        {
          text: "User",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        return record.isAdmin === value;
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => {
        return (
          <div>
            <Button
              type="primary"
              onClick={handleOpenModalEdit}
              style={{ marginRight: "12px" }}
            >
              Edit
            </Button>
            <Button danger type="primary" onClick={handleOpenModalDelete}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {contextHolder}
      <h1>
        Quản lý user
        <Button style={{ marginLeft: "10px" }}>Add new user</Button>
      </h1>
      <LoadingComponent isLoading={isLoadingAllUser}>
        <TableComponent
          rowSelect
          data={dataUser}
          column={column}
          onRow={(record, rowIndex) => {
            return {
              onClick: (e) => {
                setRowSelect(record._id);
              },
            };
          }}
        />
      </LoadingComponent>
      <LoadingComponent isLoading={isPendingDeleteUser}>
        <Modal
          title="Confirm delete"
          open={isModalOpenDelete}
          onOk={handleDeleteUser}
          onCancel={handleCloseModalDelete}
        >
          <div>Are you sure delete this user?</div>
        </Modal>
      </LoadingComponent>
      <WrapperModal
        open={isModalOpenEdit}
        onCancel={handleCloseModalEdit}
        title="Confirm delete"
      >
        <LoadingComponent isLoading={isLoadingDetail}>
          <LoadingComponent isLoading={isPendingUpdateUser}>
            <Form
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 14,
              }}
            >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input name!",
                  },
                ]}
                label="Name"
              >
                <Input
                  onChange={(e) => {
                    handleOnChangeInput(e);
                  }}
                  name="name"
                  value={userDetail?.name}
                />
              </Form.Item>
              <Form.Item label="Role">
                <Select
                  onChange={(e) => {
                    setUserDetail({ ...userDetail, isAdmin: e });
                  }}
                  name="isAdmin"
                  value={userDetail?.isAdmin ? "Admin" : "User"}
                >
                  <Select.Option value={true}>Admin</Select.Option>
                  <Select.Option value={false}>User</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Email">
                <Input name="email" disabled value={userDetail?.email} />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input phone!",
                  },
                ]}
                label="Phone"
              >
                <Input
                  onChange={(e) => {
                    handleOnChangeInput(e);
                  }}
                  name="phone"
                  value={userDetail?.phone}
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input address!",
                  },
                ]}
                label="Address"
              >
                <Input
                  onChange={(e) => {
                    handleOnChangeInput(e);
                  }}
                  name="address"
                  value={userDetail?.address}
                />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input image!",
                  },
                ]}
                label="Image"
              >
                <div
                  style={{
                    width: "300px",
                    marginRight: "12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <WrapperUpload maxCount={1} onChange={handleChangeImage}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </WrapperUpload>

                  {userDetail?.avatar && (
                    <Image
                      src={userDetail?.avatar}
                      style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    marginTop: "12px",
                  }}
                  onClick={handleUpdateUser}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </LoadingComponent>
        </LoadingComponent>
      </WrapperModal>
    </div>
  );
};

export default AdminUser;
