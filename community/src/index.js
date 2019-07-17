import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Row, Col, Icon, Input, Dropdown, Avatar } from 'antd';
import Community_1 from './material/community_1.jpg';
import Community_2 from './material/community_2.jpg';
import { List } from 'antd';
import { Carousel } from 'antd';


const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;
const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="">个人主页</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="">登录</a>
        </Menu.Item>
    </Menu>
);


const listData = [];
for (let i = 0; i < 50; i++){
    listData.push({
        href:'',
        title:`question ${i}`,
        avatar: './material/soybean.jpg',
        content:'nothing now',
    });
}

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

const sectionStyle = {
    display:'inline-block',height:'1200px', backgroundImage:`url(` +Community_2 + `)`,
};



ReactDOM.render(
    <div className="community">
        <Layout>
            <Header style={{position: 'fixed', zIndex:1,width:'1519px', background:'lightgray',opacity:0.9}}>
                    <Row type="flex" justify="start">
                        <Col span={3} offset={0}>
                            <div className="homelogo">
                                <a href="../public/index.html"><Icon type="home" style={{color:'black'}}/></a>
                                <a href='../public/index.html' style={{color:'black',fontSize:'38px'}}>HOME</a>
                            </div>
                        </Col>
                        <Col span={3} offset={2}>
                            <div className="smilesoybean">
                                <a href=""><Icon type="smile" style={{color:'black'}}/></a>
                                <a href="" style={{color:"black",fontSize:'30px'}}>huangdou</a>
                            </div>
                        </Col>
                        <Col span={4} offset={2}>
                            <div className="webname">
                                <p>黄豆|知识</p>
                            </div>
                        </Col>
                        <Col span={3} offset={2}>
                            <div className="search">
                                <Search
                                    placeholder="搜索"
                                    onSearch={value =>console.log(value)}
                                    style={{width:"250px"}}
                                />
                            </div>
                        </Col>
                        <Col span={2} offset={3}>
                            <div>
                                <Dropdown overlay={menu}>
                                    <div className="userlogo">
                                        <Avatar icon="user" src='' className="ant-dropdown-link" href="#" style={{background:"black"}} />
                                        <Icon type="down"/>
                                    </div>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
            </Header>
            <Layout>
                <div style={sectionStyle} className="ph2">
                    <div>
                        <img src={Community_1} className="ph1"/>
                        <p className="enjoy">ENJOY YOURSELF IN</p>
                        <p className="huangdou">HuangDou</p>
                        <Icon className="build" type="build" theme="twoTone" spin/>
                    </div>
                    <Content>
                        <div className="display">
                            <List
                                itemLayout="vertical" size="large"
                                pagination={{ onChange: page =>{console.log(page);}, pageSize:6 }}
                                dataSource={listData}
                                renderItem={ item => (
                                    <List.Item key={item.title}
                                        actions={[
                                            <IconText type="like" text="0" />,
                                            <IconText type="dislike" text="0" />,
                                            <IconText type="star" />,
                                            <IconText type="message" text="0" />]}
                                                >
                                        <List.Item.Meta
                                            avatar={<Avatar className="useravatar" src={item.avatar} />}
                                            title={<a className="question" href={item.href}>{item.title}</a>}
                                            />
                                        {item.content}
                                    </List.Item>
                                )}
                                    />
                        </div>
                    </Content>
                    <Sider width={400} className="banner">
                        <Carousel autoplay>
                            <div>
                                <h3>1</h3>
                            </div>
                            <div>
                                <h3>2</h3>
                            </div>
                            <div>
                                <h3>3</h3>
                            </div>
                            <div>
                                <h3>4</h3>
                            </div>
                        </Carousel>
                    </Sider>
                </div>
            </Layout>
            <Footer style={{ textAlign:'center' }}>
                Soybean Knowledge ©2019 Created by Endless NIght Seclusion
            </Footer>
        </Layout>
    </div>,
    document.getElementById('root')
);








