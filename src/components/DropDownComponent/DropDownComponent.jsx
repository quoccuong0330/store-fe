import { Button, Dropdown } from "antd";
import React from "react";

const DropDownComponent = ({ children, isOpen = false, itemSearch }) => {
  const items =
    itemSearch &&
    itemSearch.map((item, key) => {
      return {
        key: key,
        label: (
          <a target="_blank" rel="noopener noreferrer" href=" ">
            {item?.name || "undefined"}
          </a>
        ),
      };
    });
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomLeft"
      open={isOpen}
    >
      {children}
    </Dropdown>
  );
};

export default DropDownComponent;
