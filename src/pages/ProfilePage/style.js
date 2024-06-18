import { Col, Input, Upload } from "antd";
import styled from "styled-components";

export const WrapperForm = styled.div`
  padding: 0 120px;
  margin-top: 20px;
`;

export const WrapperRow = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

export const WrapperColCenter = styled(Col)`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
`;

export const WrapperLabel = styled.label`
  min-width: 120px;
`;

export const WrapperInput = styled(Input)`
  width: 300px;
  margin-right: 12px;
`;

export const WrapperUpload = styled(Upload)`
  & .ant-upload-list.ant-upload-list-text {
    display: none;
  }
  &.ant-upload-list-item-info {
    display: none;
  }
  margin-right: 12px;
`;
