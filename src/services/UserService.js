import axios from "axios";

export const axiosJWT = axios.create();

export const signUpUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_USER}/sign-up`,
    data
  );
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_USER}/sign-in`,
    data
  );
  return res.data;
};

export const getDetailUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_USER}/get-detail/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const refreshToken = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_USER}/refresh-token`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const logOutUser = async () => {
  const res = await axios.post(`${process.env.REACT_APP_API_USER}/log-out`);
  return res.data;
};

export const getAllUser = async (access_token) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_USER}/get-all-user`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const updateUser = async (data) => {
  const { access_token, id } = data;
  delete data["access_token"];
  delete data["_id"];
  delete data["id"];
  const res = await axios.put(
    `${process.env.REACT_APP_API_USER}/update-user/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteUser = async (data) => {
  const { access_token, id } = data;
  const res = await axios.delete(
    `${process.env.REACT_APP_API_USER}/delete-user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
