import React, { useEffect, useState } from "react";
import {
  WrapperImage,
  WrapperDetail,
  WrapperInfo,
  WrapperStoreAndPrice,
  ImageProduct,
  WrapperArrayImage,
  WrapperItemImage,
  WrapperTittle,
  WrapperButtonRed,
  WrapperButtonNormal,
  WrapperButton,
  WrapperBlock,
  WrapperButtonCount,
  WrapperNameProduct,
  WrapperPriceProduct,
  WrapperInfoProduct,
} from "./style";
import { Col, Image, Row } from "antd";
import { StarFilled } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import store1 from "../../assets/images/store1.webp";

const convertPrice = (price) => {
  return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
};

const ProductDetailComponent = ({ arrayImageProduct }) => {
  const [imageFocus, setImageFocus] = useState(arrayImageProduct[0]);
  const [count, setCount] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [price, setPrice] = useState(270000);
  const [totalPrice, setTotalPrice] = useState(price * count);

  useEffect(() => {
    setTotalPrice(price * count);
  }, [count, price]);
  const handleChangeImageFocus = (e) => {
    setImageFocus(e.target.src);
  };

  return (
    <WrapperDetail>
      <Row>
        <Col span={7}>
          <WrapperImage>
            <ImageProduct src={imageFocus} style={{ width: "100%" }} />
            <WrapperArrayImage>
              {arrayImageProduct.map((item, index) => {
                return (
                  <WrapperItemImage
                    key={index}
                    onClick={(e) => handleChangeImageFocus(e)}
                  >
                    <Image
                      preview={false}
                      style={{ width: "47px" }}
                      src={item}
                    />
                  </WrapperItemImage>
                );
              })}
            </WrapperArrayImage>
          </WrapperImage>
        </Col>
        <Col span={11}>
          <WrapperInfo>
            <WrapperNameProduct>
              Trung Nguyên Legend - Cà phê sữa hòa tan G7 3in1 - Bịch 100 sticks
              x 16gr (gói dài)
            </WrapperNameProduct>
            <WrapperInfoProduct>
              5.0 <StarFilled style={{ color: "rgba(244, 255, 0, 1)" }} />
              <span style={{ color: "#787878" }}> (410) | Da ban 4717</span>
            </WrapperInfoProduct>
            <WrapperPriceProduct>
              {convertPrice(price)}D <span>-14%</span>
            </WrapperPriceProduct>
          </WrapperInfo>
          <WrapperInfo>
            <div>
              <WrapperTittle>Thong tin van chuyen</WrapperTittle>
            </div>
            <Link style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#000" }}>
                Giao đến Q. 1, P. Bến Nghé, Hồ Chí Minh
              </span>
              <span>Doi</span>
            </Link>
          </WrapperInfo>
          <WrapperInfo>
            <div>
              <span style={{ fontWeight: "bold" }}>Mo ta san pham</span>
              <p>
                Màn hình máy tính LG 27MP500-B vẫn đi theo phong cách tối giản
                vốn là đặc trưng trong thiết kế của hãng, LG 27MP500-B được
                thiết kế mỏng nhẹ, hiện đại với màu đen chủ đạo. Chiếc màn hình
                có kích thước 27 inch và tỉ lệ hiển thị 16:9 tiêu chuẩn, đủ rộng
                rãi cho nhu cầu chơi game hay giải trí đa phương tiện của người
                dùng phổ thông. Thiết kế của LG 27MP500-B phù hợp với bất kì
                không gian nội thất hiện đại nào, từ không gian công sở lịch sự
                đến phòng làm việc riêng tư. Sở hữu màn hình với thiết kế ba
                viền cực mỏng phù hợp với xu hướng hiện nay, LG 27MP500-B mang
                đến một màn ảnh rộng, giúp người dùng có được trải nghiệm làm
                việc và giải trí tuyệt vời. Màn hình hầu như không có đường viền
                3 cạnh làm tăng sự tập trung đối đa vào nội dung hiển thị. Logo
                hãng được đặt ngay trung tâm cạnh dưới, mang lại vẻ tối giản
                nhưng không kém phần hiện đại. Phần chân đế của LG 27MP500-B
                thiết kế hình chữ nhật truyền thống, giúp nâng đỡ tốt phần màn
                hình phía trên và tạo sự chắc chắn khi để trên mặt bàn. Nếu sở
                hữu một bàn làm việc với diện tích khiêm tốn, người dùng thay vì
                sử dụng chân đế thì có thể treo trực tiếp chiếc màn hình này
                trên tường cũng rất tiện lợi.
              </p>
            </div>
          </WrapperInfo>
        </Col>
        <Col span={6}>
          <WrapperStoreAndPrice>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <Image
                src={store1}
                preview={false}
                style={{ width: "40px", marginRight: "10px" }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>Trung Nguyen Lenged</div>
                <div>
                  Offcial |
                  <span>
                    5.0{" "}
                    <StarFilled
                      style={{
                        color: "rgba(244, 255, 0, 1)",
                      }}
                    />
                    (410k+ danh gia)
                  </span>
                </div>
              </div>
            </div>
            <WrapperBlock>
              <WrapperTittle>So luong</WrapperTittle>
              <div style={{ display: "flex", alignItems: "center" }}>
                <WrapperButtonCount
                  disabled={count <= 1 ? true : false}
                  onClick={() => {
                    setCount(count - 1);
                  }}
                >
                  -
                </WrapperButtonCount>
                <WrapperTittle
                  style={{
                    margin: "0 4px",
                    display: "flex",
                    justifyContent: "center",
                    minWidth: "20px",
                  }}
                >
                  {convertPrice(count)}
                </WrapperTittle>
                <WrapperButtonCount
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  +
                </WrapperButtonCount>
              </div>

              <WrapperTittle>Tam tinh</WrapperTittle>
              <WrapperTittle>{convertPrice(totalPrice)}₫</WrapperTittle>
            </WrapperBlock>
            <WrapperButton>
              <WrapperButtonRed type="primary" danger>
                Mua ngay
              </WrapperButtonRed>
              <WrapperButtonNormal type="primary">
                Them vao gio
              </WrapperButtonNormal>
              <WrapperButtonNormal type="primary">
                Mua truoc tra sau
              </WrapperButtonNormal>
            </WrapperButton>
          </WrapperStoreAndPrice>
        </Col>
      </Row>
    </WrapperDetail>
  );
};

export default ProductDetailComponent;
