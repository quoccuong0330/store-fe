import React from "react";
import { StarFilled } from "@ant-design/icons";
import {
  WrapperBlock,
  WrapperCard,
  WrapperImageProduct,
  WrapperName,
  WrapperPrice,
  WrapperProvide,
  WrapperStarAndBuy,
} from "./style";
import { VNDong } from "../../utils";

const CardProductComponent = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { name, image, price, type, id, rating, countInStock, sell, discount } =
    props;
  const priceFormat = VNDong.format(price);
  return (
    <WrapperCard
      hoverable
      style={{
        width: 200,
      }}
      styles={{ padding: "0 10px 10px" }}
      cover={
        <WrapperImageProduct
          style={{ height: "200px", objectFit: "cover" }}
          alt="Image product"
          src={
            image ??
            "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          }
        />
      }
    >
      <WrapperBlock>
        <WrapperName>{name}</WrapperName>
      </WrapperBlock>
      <WrapperBlock>
        <WrapperPrice>{priceFormat}</WrapperPrice>
      </WrapperBlock>
      <WrapperStarAndBuy>
        <span>
          {rating}
          <StarFilled
            style={{ color: "rgba(244, 255, 0, 1)", marginLeft: "4px" }}
          />
        </span>
        <span>Đã bán {sell ?? 5}</span>
      </WrapperStarAndBuy>
      <WrapperBlock>
        <WrapperProvide>Còn {countInStock ?? 2} sản phẩm</WrapperProvide>
      </WrapperBlock>
    </WrapperCard>
  );
};

export default CardProductComponent;
