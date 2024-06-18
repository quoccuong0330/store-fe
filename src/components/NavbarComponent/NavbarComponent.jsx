import React from "react";
import { WrapperCategory, WrapperLink } from "./style";

const NavbarComponent = ({ arrCategory }) => {
  return (
    <WrapperCategory
      style={{
        height: "100vh",
      }}
    >
      <h3>Danh muc san pham</h3>

      {arrCategory.map((item, index) => {
        return <WrapperLink key={index}>{item}</WrapperLink>;
      })}
    </WrapperCategory>
  );
};

export default NavbarComponent;
