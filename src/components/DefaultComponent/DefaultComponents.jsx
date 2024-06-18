import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const DefaultComponents = ({ children }) => {
  return (
    <div>
      <HeaderComponent isShowCart={true} isShowSearch={true} />
      {children}
    </div>
  );
};

export default DefaultComponents;
