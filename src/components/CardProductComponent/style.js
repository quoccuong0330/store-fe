import { Card, Image } from "antd";
import styled from "styled-components";

export const WrapperStarAndBuy = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`;

export const WrapperCard = styled(Card)`
  &.ant-card-body {
    padding: 14px 0;
  }
`;

export const WrapperImageProduct = styled(Image)`
  height: 200px;
  width: 200px;
`;

export const WrapperName = styled.span`
  font-size: 12px;
`;
export const WrapperPrice = styled.span`
  font-size: 16px;
  color: red;
`;

export const WrapperBlock = styled.div`
  margin-top: 8px;
`;

export const WrapperProvide = styled.span`
  margin-top: 8px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
`;
