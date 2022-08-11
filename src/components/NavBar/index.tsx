import React from "react";
import { Layout } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";

const { Header } = Layout;

type HeaderProps = {
  title: string;
};

export default function NavBar(props: HeaderProps) {
  return (
    <Header className="headerWrapper">
      <UsergroupAddOutlined style={{ fontSize: "32px" }} /> {props.title}
    </Header>
  );
}
