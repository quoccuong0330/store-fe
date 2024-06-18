import styled from "styled-components";
import { Row } from "antd";
import Link from "antd/es/typography/Link";

export const WrapperHeader = styled(Row)`
  padding: 12px 240px;
  background-color: blue;
`;

export const WrapperTextHeader = styled.span`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: left;
`;

export const WrapperAccount = styled.span`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
  font-size: 14px;
  justify-content: flex-end;
`;

export const WrapperLinkTextHeader = styled(Link)`
  color: #fff !important;
  font-size: 14px;
`;

export const WrapperPopover = styled.div`
  min-width: 200px;
`;

export const WrapperPopoverItem = styled.div`
  padding: 8px 6px;
  cursor: pointer;
  &:hover {
    color: red;
    background: #ccc;
  }
  border-radius: 8px;
`;
