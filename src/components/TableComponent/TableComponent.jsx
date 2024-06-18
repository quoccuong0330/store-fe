import React, { useState } from "react";
import { Button, Table } from "antd";

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // setSelectRow(selectedRows);
    // console.log("selectedRows: ", selectedRows);
  },
};

const TableComponent = (props) => {
  const { data, column } = props;
  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={column}
        dataSource={data}
        {...props}
      />
    </div>
  );
};
export default TableComponent;
