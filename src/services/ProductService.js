/* eslint-disable no-dupe-keys */
import axios from "axios";

export const getAllProduct = async (search = "", limit) => {
  let res = {};
  if (search.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_PRODUCT}/get-all?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(
      `${process.env.REACT_APP_API_PRODUCT}/get-all?limit=${limit}`
    );
  }
  return res.data;
};

export const createProduct = async (data) => {
  const { access_token } = data;
  delete data["access_token"];
  const res = await axios.post(
    `${process.env.REACT_APP_API_PRODUCT}/create`,
    data,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteProduct = async (data) => {
  const { access_token, key } = data;
  const res = await axios.delete(
    `${process.env.REACT_APP_API_PRODUCT}/delete/${key}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getProductById = async (data) => {
  const { key } = data;
  if (!key) return { data: "" };
  const res = await axios.get(
    `${process.env.REACT_APP_API_PRODUCT}/get-detail/${key}`
  );
  return res.data || {};
};

export const updateProduct = async (data) => {
  const { key, access_token } = data;
  const res = await axios.put(
    `${process.env.REACT_APP_API_PRODUCT}/update/${key}`,
    { ...data, id: data._id },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
