import React from "react";
import { Table as DataTable } from "antd";

const Table = (props: any) => {
  return (
    <DataTable
      rowKey={(record) => record.id}
      columns={props.columns}
      dataSource={props.data}
      pagination={false}
    />
  );
};

export default Table;
