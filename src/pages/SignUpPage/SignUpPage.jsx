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
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { error, success } from "../../components/Message/Message";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleNavigateSignIn = useCallback(() => {
    navigate("/sign-in");
  }, [navigate]);

  const mutation = useMutationHooks((data) => UserService.signUpUser(data));
  const { data, isPending, isError, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess) {
      success();
      handleNavigateSignIn();
    } else if (isError) {
      error();
    }
  }, [isError, isSuccess, handleNavigateSignIn]);

  const [email, setEmail] = useState("");
  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const handleOnChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword });
  };

  return (
    <WrapperPage>
      <WrapperForm>
        {/* <WrapperHeader>
          <Button>Close</Button>
        </WrapperHeader> */}
        <WrapperTitle>
          <div style={{ fontSize: "18px" }}>Dang ki</div>
          <div style={{ fontSize: "14px" }}>Nhap email va mat khau</div>
        </WrapperTitle>
        <div>
          <InputForm
            isSignUp={true}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            handleOnChangeEmail={handleOnChangeEmail}
            handleOnChangePassword={handleOnChangePassword}
            handleOnChangeConfirmPassword={handleOnChangeConfirmPassword}
          />
          <div style={{ height: "10px" }}>
            {data?.status === "ERR" && (
              <WrapperErrorInput>{data?.message}</WrapperErrorInput>
            )}
          </div>
        </div>
        <LoadingComponent isLoading={isPending}>
          <WrapperButton>
            <ButtonStyle
              danger
              type="primary"
              onClick={() => handleSignUp()}
              disabled={
                !email.length || !password.length || !confirmPassword.length
              }
            >
              Dang Ki
            </ButtonStyle>
          </WrapperButton>
        </LoadingComponent>

        <WrapperFooter>
          <div>
            <LinkStyle>quen mat khau</LinkStyle>
          </div>
          <div>
            Chua co tai khoan{" "}
            <LinkStyle onClick={() => handleNavigateSignIn()}>
              Da co tai khoan
            </LinkStyle>
          </div>
        </WrapperFooter>
      </WrapperForm>
    </WrapperPage>
  );
};

export default SignUpPage;
