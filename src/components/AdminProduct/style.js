import { Modal } from "antd";
import styled from "styled-components";

export const WrapperRow = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

export const WrapperLabel = styled.label`
  min-width: 120px;
`;

export const WrapperModal = styled(Modal)`
  & .ant-modal-footer {
    display: none;
  }
`;
