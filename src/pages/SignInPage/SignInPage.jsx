import React, { useCallback, useEffect, useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import {
  ButtonStyle,
  LinkStyle,
  WrapperButton,
  WrapperErrorInput,
  WrapperFooter,
  WrapperForm,
  WrapperPage,
  WrapperTitle,
} from "./style";
import { useNavigate } from "react-router-dom";
import { getDetailUser, loginUser } from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { success } from "../../components/Message/Message";
import { updateUser } from "../../redux/slices/userSlices";
import { useDispatch } from "react-redux";
import { isJsonString } from "../../utils";
import { jwtDecode } from "jwt-decode";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const handleGetDetailUser = useCallback(
    async (token) => {
      const { decode } = handleDecode();
      const res = await getDetailUser(decode?.id, token);
      dispatch(updateUser({ ...res?.data, token }));
    },
    [dispatch]
  );

  const mutation = useMutationHooks((data) => loginUser(data));
  const { data, isPending, isSuccess } = mutation;

  useEffect(() => {
    if (data?.status === "OK") {
      success();
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      handleGetDetailUser(data?.access_token);
      navigate("/");
    }
  }, [
    data?.access_token,
    data?.status,
    handleGetDetailUser,
    isSuccess,
    navigate,
  ]);

  const [email, setEmail] = useState("");
  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    mutation.mutate({ email, password });
  };

  const handleDecode = () => {
    let storageData = localStorage.getItem("access_token");
    let decode = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decode = jwtDecode(storageData);
    }
    return { decode, storageData };
  };

  return (
    <WrapperPage>
      <WrapperForm>
        {/* <WrapperHeader>
          <Button>Close</Button>
        </WrapperHeader> */}
        <WrapperTitle>
          <div style={{ fontSize: "18px" }}>Dang nhap</div>
          <div style={{ fontSize: "14px" }}>Nhap email va mat khau</div>
        </WrapperTitle>
        <div>
          <InputForm
            email={email}
            password={password}
            handleOnChangeEmail={handleOnChangeEmail}
            handleOnChangePassword={handleOnChangePassword}
          />
          <div style={{ height: "10px" }}>
            {data?.status === "ERR" && (
              <WrapperErrorInput>{data?.message}</WrapperErrorInput>
            )}{" "}
          </div>
        </div>
        <LoadingComponent isLoading={isPending}>
          <WrapperButton>
            <ButtonStyle
              danger
              type="primary"
              onClick={() => handleSignIn()}
              disabled={!email.length || !password.length}
            >
              Dang nhap
            </ButtonStyle>
          </WrapperButton>
        </LoadingComponent>

        <WrapperFooter>
          <div>
            <LinkStyle>quen mat khau</LinkStyle>
          </div>
          <div>
            Chua co tai khoan{" "}
            <LinkStyle onClick={() => handleNavigateSignUp()}>
              Tao tai khoan
            </LinkStyle>
          </div>
        </WrapperFooter>
      </WrapperForm>
    </WrapperPage>
  );
};

export default SignInPage;
