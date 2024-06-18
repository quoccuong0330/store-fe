import { Button } from "antd";
import Link from "antd/es/typography/Link";
import styled from "styled-components";

export const WrapperPage = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
`;

export const WrapperForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 35%;
  border: 1px solid #ccc;
  justify-content: space-between;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const WrapperHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

export const WrapperTitle = styled.div`
  margin-bottom: 10px;
`;

export const WrapperButton = styled.div`
  display: flex;
  justify-content: center;
`;

export const ButtonStyle = styled(Button)`
  background-color: red;
  width: 60%;
  color: #fff;
  font-weight: bold;
`;

export const LinkStyle = styled(Link)`
  color: #ccc;
  font-size: 12px;
`;

export const WrapperFooter = styled.div``;
export const WrapperErrorInput = styled.span`
  color: red;
  fontsize: 12px;
`;
