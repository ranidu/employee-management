import React from "react";
import { Layout } from "antd";

import NavBar from "../../components/NavBar";

const { Content, Footer } = Layout;

const MainLayout = (props: any) => {
  return (
    <Layout style={{ height: "100vh" }}>
      <NavBar title="Employee Manager" />
      <Content className={"contentWrapper"}>{props.children}</Content>
      <Footer></Footer>
    </Layout>
  );
};

export default MainLayout;
