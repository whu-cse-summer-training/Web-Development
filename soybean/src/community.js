import React from 'react';
import ReactDom from 'react-dom';
import 'antd/dist/antd.css';
import './community.css';
import { Layout, Menu,Breadcrumb } from 'antd';


const { Header, Content, Sider, Footer } = Layout;


ReactDom.render(
    <div>
        <Layout>
            <Header></Header>
            <Layout>
                <Content></Content>
                <Sider></Sider>
            </Layout>
            <Footer></Footer>
        </Layout>
    </div>,
    document.getElementById('community'),
);







