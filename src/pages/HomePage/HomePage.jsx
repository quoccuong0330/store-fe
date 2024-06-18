/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import TypeProductComponent from "../../components/TypeProductComponent/TypeProductComponent";
import {
  WrapperButton,
  WrapperHomePage,
  WrapperProduct,
  WrapperTypeProduct,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import banner1 from "../../assets/images/banner_1.webp";
import banner2 from "../../assets/images/banner_2.webp";
import banner3 from "../../assets/images/banner_3.webp";
import CardProductComponent from "../../components/CardProductComponent/CardProductComponent";
import { Button } from "antd";
import { getAllProduct } from "../../services/ProductService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const searchRef = useRef(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [limit, setLimit] = useState(6);

  const arrProduct = [
    { name: "TV", link: "/tv" },
    { name: "Tu lanh", link: "/tu-lanh" },
    { name: "Laptop", link: "/laptop" },
  ];

  const fetchAllProduct = async (search) => {
    const res = await getAllProduct(search, limit);
    setDataProduct(res);
    return res;
  };

  useEffect(() => {
    console.log(1);
    fetchAllProduct();
  }, [limit]);

  const {
    isPending: isPendingAllProduct,
    isLoading: isLoadingAllProduct,
    data: dataAllProduct,
    isSuccess: isSuccessAllProduct,
    isPlaceholderData,
  } = useQuery({
    queryFn: fetchAllProduct,
    queryKey: ["products"],
    retry: 3,
    retryDelay: 1000,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (searchRef.current) {
      console.log(2);
      fetchAllProduct(searchDebounce);
    }
    searchRef.current = true;
  }, [searchDebounce]);

  // useEffect(() => {
  //   if (dataAllProduct?.status === "OK" && isSuccessAllProduct) {
  //     setDataProduct(dataAllProduct);
  //   }
  // }, [dataAllProduct]);

  return (
    <div>
      <WrapperTypeProduct>
        {arrProduct.map((item, index) => {
          return (
            <TypeProductComponent
              name={item.name}
              link={item.link}
              key={index}
            />
          );
        })}
      </WrapperTypeProduct>
      <WrapperHomePage>
        <SliderComponent arrImages={[banner1, banner2, banner3]} />
        <LoadingComponent isLoading={isPendingAllProduct}>
          <WrapperProduct>
            {dataProduct?.data?.map((item) => {
              return (
                <CardProductComponent
                  name={item.name}
                  rating={item.rating}
                  price={item.price}
                  image={item.image}
                  key={item._id}
                  sell={item.sell}
                  discount={item.discount}
                />
              );
            })}
          </WrapperProduct>
          <WrapperButton>
            <Button
              style={{ width: "20%" }}
              onClick={() => {
                setLimit((limit) => limit + 6);
              }}
              disabled={
                dataProduct?.total <= limit ||
                isPlaceholderData ||
                isLoadingAllProduct
              }
            >
              Xem them
            </Button>
          </WrapperButton>
        </LoadingComponent>
      </WrapperHomePage>
    </div>
  );
};

export default HomePage;
