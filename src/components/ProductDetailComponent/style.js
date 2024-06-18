import { Button, Image } from "antd";
import styled from "styled-components";

export const WrapperDetail = styled.div``;

export const WrapperImage = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-right: 8px;
`;

export const WrapperInfo = styled.div`
  background-color: #fff;
  padding: 15px 10px;
  border-radius: 8px;
  margin: 0 8px 15px;
`;

export const WrapperStoreAndPrice = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-left: 8px;
`;

export const ImageProduct = styled(Image)`
  width: 368px;
  height: 368px;
`;

export const WrapperItemImage = styled.div`
  background-color: #fff;
  padding: 4px;
  border: 1px solid #ccc;
  margin-left: 4px;
`;

export const WrapperArrayImage = styled.div`
  display: flex;
  margin-top: 8px;
`;

export const WrapperTittle = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

export const WrapperButtonRed = styled(Button)`
  width: 100%;
  padding: 5px 0;
  margin: 4px 0;
`;

export const WrapperButtonNormal = styled(Button)`
  width: 100%;
  padding: 5px 0;
  margin: 4px 0;
`;

export const WrapperButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const WrapperBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  min-height: 110px;
  margin: 10px 0;
  border-top: 1px solid #ccc;
`;

export const WrapperButtonCount = styled(Button)`
  width: 40px;
  margin: 0 4px;
`;

export const WrapperNameProduct = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
`;

export const WrapperInfoProduct = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin: 5px 0;
`;

export const WrapperPriceProduct = styled.div`
  font-size: 24px;
  margin-bottom: 5px;
`;
