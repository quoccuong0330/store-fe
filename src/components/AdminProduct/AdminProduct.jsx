/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Space,
  notification,
} from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { WrapperModal } from "./style";
import { WrapperUpload } from "../../pages/ProfilePage/style";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";

const AdminProduct = () => {
  const [form] = Form.useForm();
  const initNewProduct = {
    name: "",
    price: "",
    type: "TV",
    discount: "",
    countInStock: "",
    rating: "",
    description: "",
    image: "",
  };

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

  //Init Data
  const [rowSelect, setRowSelect] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [isModalEditProduct, setIsModalEditProduct] = useState(false);

  const [newProduct, setNewProduct] = useState(initNewProduct);
  const [productDetail, setProductDetail] = useState(initNewProduct);
  const access_token = JSON.parse(localStorage.getItem("access_token"));

  //Anything about Modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setNewProduct(initNewProduct);
    setIsModalOpen(false);
  };

  //Anything about Mutation
  const deleteProductMutation = useMutationHooks(async (data) => {
    const res = await deleteProduct(data);
    return res;
  });
  const createNewProductMutation = useMutationHooks(async (data) => {
    const res = await createProduct(data);
    return res;
  });
  const updateNewProductMutation = useMutationHooks(async (data) => {
    const res = updateProduct(data);
    return res;
  });

  //Anything about get data from Mutation
  const {
    isError: isErrorCreate,
    isSuccess: isSuccessCreate,
    isPending: isPendingCreate,
    data: dataCreate,
  } = createNewProductMutation;
  const {
    isError: isErrorDelete,
    isSuccess: isSuccessDelete,
    data: dataDelete,
    isPending: isPendingDelete,
  } = deleteProductMutation;
  const {
    isError: isErrorUpdate,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
    data: dataUpdate,
  } = updateNewProductMutation;

  //Anything about onClick event
  const handleOnClickBtnDelete = async () => {
    deleteProductMutation.mutate(
      { key: rowSelect, access_token },
      {
        onSettled: () => {
          refetch();
        },
      }
    );
  };

  //Anything about onChange event
  const handleChangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setNewProduct({ ...newProduct, image: file.preview });
  };

  const handleChangeImageDetail = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setProductDetail({ ...productDetail, image: file.preview });
  };

  const handleOnChangeInput = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleOnChangeInputProduct = (e) => {
    setProductDetail({
      ...productDetail,
      [e.target.name]: e.target.value,
    });
  };

  //Anything about modal's event
  const onFinishCreateProduct = () => {
    createNewProductMutation.mutate(
      { ...newProduct, access_token },
      {
        onSettled: () => {
          refetch();
        },
      }
    );
  };

  const onFinishFailedCreateProduct = () => {
    openNotificationWithIcon("warning", "Input is required");
  };

  const onFinishUpdateProduct = () => {
    updateNewProductMutation.mutate(
      { ...productDetail, access_token, key: rowSelect },
      {
        onSettled: () => {
          refetch();
        },
      }
    );
  };

  const onFinishFailedUpdateProduct = () => {
    openNotificationWithIcon("warning", "Input is required");
  };

  //Set data for edit modal
  const fetchProductById = useCallback(async () => {
    const res = await getProductById({ key: rowSelect });
    return res.data;
  }, [rowSelect]);

  const { data: dataById, isLoading: isLoadingDetail } = useQuery({
    queryKey: ["id", rowSelect],
    queryFn: fetchProductById,
    retry: 3,
    retryDelay: 1000,
    enabled: !!rowSelect,
  });

  //Anything about useEffect
  useEffect(() => {
    if (isSuccessUpdate && dataUpdate?.status === "OK") {
      openNotificationWithIcon("success", dataUpdate?.message);
      setIsModalEditProduct(false);
    } else if (isErrorUpdate) {
      openNotificationWithIcon("error", dataUpdate?.message);
    } else if (isSuccessUpdate && dataUpdate?.status === "ERR") {
      openNotificationWithIcon("warning", dataUpdate?.message);
    }
  }, [
    dataUpdate?.message,
    dataUpdate?.status,
    form,
    isErrorUpdate,
    isSuccessUpdate,
    openNotificationWithIcon,
  ]);

  useEffect(() => {
    if (isSuccessDelete && dataDelete.status === "OK") {
      setIsModalConfirm(false);
      openNotificationWithIcon(
        "success",
        dataDelete?.message ?? "Delete product success"
      );
    } else if (isErrorDelete) {
      openNotificationWithIcon(
        "error",
        dataDelete?.message ?? "Delete product failure"
      );
    } else if (isSuccessDelete && dataDelete.status === "ERR") {
      openNotificationWithIcon(
        "error",
        dataDelete?.message ?? "Delete product fail"
      );
    }
  }, [
    dataDelete?.message,
    dataDelete?.status,
    isErrorDelete,
    isSuccessDelete,
    openNotificationWithIcon,
  ]);

  useEffect(() => {
    if (isSuccessCreate && dataCreate?.status === "OK") {
      openNotificationWithIcon("success", dataCreate?.message);
      setIsModalOpen(false);
      setNewProduct(initNewProduct);
      form.resetFields();
    } else if (isErrorCreate) {
      openNotificationWithIcon("error", dataCreate?.message);
    } else if (isSuccessCreate && dataCreate?.status === "ERR") {
      openNotificationWithIcon("warning", dataCreate?.message);
    }
  }, [
    dataCreate?.message,
    dataCreate?.status,
    form,
    isErrorCreate,
    isSuccessCreate,
    openNotificationWithIcon,
  ]);

  useEffect(() => {
    fetchProductById();
    if (!dataById) return;
    setProductDetail(dataById);
    form.setFieldsValue(productDetail);
  }, [rowSelect, dataById]);

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

  //Set data of table
  const fetchAllProduct = async () => {
    const res = await getAllProduct();
    console.log("data", res.dât);
    let data = res.data;
    data = data.map((item) => {
      return { ...item, key: item._id };
    });
    return data;
  };

  const {
    isLoading,
    data: products,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProduct,
    retry: 3,
    retryDelay: 1000,
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <Link style={{ color: "blue" }}>{text}</Link>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      filters: [
        {
          text: ">=2",
          value: 2,
        },
      ],
      sorter: (a, b) => a.price - b.price,
      onFilter: (value, record) => {
        return record.price >= value;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
      filters: [
        {
          text: "TV",
          value: "TV",
        },
        {
          text: "Laptop",
          value: "Laptop",
        },
      ],
      onFilter: (value, record) => {
        return record.type === value;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "In stock",
      dataIndex: "countInStock",
      sorter: (a, b) => a.countInStock - b.countInStock,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      sorter: (a, b) => a.discount - b.discount,
    },

    {
      title: "Action",
      dataIndex: "key",
      render: (key) => (
        <div>
          <Button type="primary" onClick={() => setIsModalEditProduct(true)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            style={{ marginLeft: "12px" }}
            onClick={() => {
              setIsModalConfirm(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <h1>
        Quản lý sản phẩm
        <Button style={{ marginLeft: "10px" }} onClick={showModal}>
          Add new product
        </Button>
      </h1>
      <LoadingComponent isLoading={isLoading}>
        <TableComponent
          rowSelect
          data={products}
          column={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: (e) => {
                setRowSelect(record._id);
              },
            };
          }}
        ></TableComponent>
      </LoadingComponent>
      <WrapperModal
        title="Create product"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <LoadingComponent isLoading={isPendingCreate}>
          <Form
            initialValues={newProduct}
            form={form}
            onFinish={onFinishCreateProduct}
            onFinishFailed={onFinishFailedCreateProduct}
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
              name="Name"
            >
              <Input
                onChange={(e) => {
                  handleOnChangeInput(e);
                }}
                value={newProduct.name}
                name="name"
              />
            </Form.Item>
            <Form.Item label="Type" name="Type">
              <Select
                onChange={(e) => {
                  setNewProduct({ ...newProduct, type: e });
                }}
                defaultValue="Laptop"
                name="type"
              >
                <Select.Option value="Laptop">Laptop</Select.Option>
                <Select.Option value="Tủ lạnh">Tủ lạnh</Select.Option>
                <Select.Option value="TV">TV</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input price!",
                },
              ]}
              label="Price"
              name="Price"
              type="number"
            >
              <Input
                onChange={(e) => {
                  handleOnChangeInput(e);
                }}
                name="price"
                value={newProduct.price}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input rating!",
                },
              ]}
              label="Rating"
              name="Rating"
              type="number"
            >
              <Input
                onChange={(e) => {
                  handleOnChangeInput(e);
                }}
                name="rating"
                value={newProduct.rating}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input countInStock!",
                },
              ]}
              label="Count in stock"
              name="Count in stock"
              type="number"
            >
              <Input
                onChange={(e) => {
                  handleOnChangeInput(e);
                }}
                name="countInStock"
                value={newProduct.countInStock}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input description!",
                },
              ]}
              label="Description"
              name="Description"
            >
              <Input
                onChange={(e) => {
                  handleOnChangeInput(e);
                }}
                name="description"
                value={newProduct.description}
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input discount!",
                },
              ]}
              label="Discount"
              type="number"
              name="Discount"
            >
              <Input
                onChange={(e) => {
                  handleOnChangeInput(e);
                }}
                name="discount"
                value={newProduct.discount}
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
              name="Image"
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

                {newProduct.image && (
                  <Image
                    src={newProduct.image}
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
              >
                Submit
              </Button>
            </div>
          </Form>
        </LoadingComponent>
      </WrapperModal>

      {/* <Modal delete> */}
      <Modal
        title="Confirm"
        open={isModalConfirm}
        onCancel={() => {
          setIsModalConfirm(false);
        }}
        okText="Delete"
        onOk={handleOnClickBtnDelete}
        okType="danger"
      >
        <LoadingComponent isLoading={isPendingDelete}>
          <div>Do you want to delete this product?</div>
        </LoadingComponent>
      </Modal>

      {/* <Modal Edit> */}
      <WrapperModal
        title="Edit product"
        open={isModalEditProduct}
        onCancel={() => setIsModalEditProduct(false)}
      >
        <LoadingComponent isLoading={isPendingUpdate}>
          <LoadingComponent isLoading={isLoadingDetail}>
            <Form
              initialValues={productDetail}
              onFinish={onFinishUpdateProduct}
              onFinishFailed={onFinishFailedUpdateProduct}
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
                    handleOnChangeInputProduct(e);
                  }}
                  name="name"
                  value={productDetail.name}
                />
              </Form.Item>
              <Form.Item label="Type" name="type">
                <Select
                  onChange={(e) => {
                    setProductDetail({ ...productDetail, type: e });
                  }}
                  defaultValue={productDetail.type}
                  name="type"
                >
                  <Select.Option value="Laptop">Laptop</Select.Option>
                  <Select.Option value="Tủ lạnh">Tủ lạnh</Select.Option>
                  <Select.Option value="TV">TV</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input price!",
                  },
                ]}
                label="Price"
                type="number"
              >
                <Input
                  onChange={(e) => {
                    handleOnChangeInputProduct(e);
                  }}
                  name="price"
                  value={productDetail.price}
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input rating!",
                  },
                ]}
                label="Rating"
                type="number"
              >
                <Input
                  onChange={(e) => {
                    handleOnChangeInputProduct(e);
                  }}
                  value={productDetail.rating}
                  name="rating"
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input countInStock!",
                  },
                ]}
                label="Count in stock"
                type="number"
              >
                <Input
                  onChange={(e) => {
                    handleOnChangeInputProduct(e);
                  }}
                  name="countInStock"
                  value={productDetail.countInStock}
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input description!",
                  },
                ]}
                label="Description"
              >
                <Input
                  onChange={(e) => {
                    handleOnChangeInputProduct(e);
                  }}
                  name="description"
                  value={productDetail.description}
                />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input discount!",
                  },
                ]}
                label="Discount"
                type="number"
              >
                {productDetail.discount && (
                  <Input
                    onChange={(e) => {
                      handleOnChangeInputProduct(e);
                    }}
                    name="discount"
                    value={productDetail.discount}
                  />
                )}
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
                  <WrapperUpload
                    maxCount={1}
                    onChange={handleChangeImageDetail}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </WrapperUpload>

                  {productDetail.image && (
                    <Image
                      src={productDetail.image}
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

export default AdminProduct;
