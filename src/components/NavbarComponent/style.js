import Link from "antd/es/typography/Link";
import styled from "styled-components";

export const WrapperLink = styled(Link)`
  color: black !important;
  text-decoration: none;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 8px;
  &:hover {
    background-color: rgba(39, 39, 42, 0.12);
  }
`;

export const WrapperUl = styled.ul`
  padding: 0;
`;

export const WrapperCategory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  algin-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #fff;
`;
