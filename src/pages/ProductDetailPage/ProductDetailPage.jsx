import React from "react";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import { WrapperDetailProduct, WrapperRoute } from "./style";
import product1 from "../../assets/images/product1.webp";
import product2 from "../../assets/images/product2.webp";
import product3 from "../../assets/images/product3.webp";

const ProductDetailPage = () => {
  const arrayImageProduct = [product1, product2, product3];
  return (
    <WrapperDetailProduct>
      <WrapperRoute>Link</WrapperRoute>
      <ProductDetailComponent arrayImageProduct={arrayImageProduct} />
    </WrapperDetailProduct>
  );
};

export default ProductDetailPage;
