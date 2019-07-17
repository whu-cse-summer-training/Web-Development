import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { Row, Col } from 'antd';
import { Icon } from 'antd';
import { Input } from 'antd';
import { Dropdown } from 'antd';
import { Button } from 'antd';
import { Avatar } from 'antd';
import home_1 from './material/home_1.jpg';
import home_2 from './material/home_2.jpg';
import home_3 from './material/home_3.jpg';
import home_3_ from './material/home_3.1.jpg';
import home_4 from './material/home_4.jpg';




const { Search } = Input;
const { Header,Content, Footer } = Layout;
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

class App extends Component{
    render() {
      return (
        <div className="App">
            <Layout>
                <Header style={{position: 'fixed', zIndex:1,width:'1519px', margin:"auto", left:0, right:0, background:'lightgray',opacity:0.9}}>
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
                <Content>
                    <div>
                        <img src={home_1} width="1519px" height="800px"/>
                        <div className="tri_right">
                            <ul>
                                <li className="li1">|</li>
                                <li className="li2">黄豆</li>
                            </ul>
                            <p className="ins1">一个符合大学生行为习惯的</p>
                            <p className="ins2">网络问答社区</p>
                        </div>
                        <div className="circle">
                            <a href=""><Icon type="bulb" className="bulb" style={{fontSize:"250px", color:"black"}}/></a>
                            <p className="ask">ASK</p>
                            <p className="now">NOW!</p>
                        </div>
                    </div>
                    <div>
                        <img src={home_2} width="1519px" height="800px"/>
                        <div className="rect1">
                            <p className="ins3">友好 | 理性 | 认真</p>
                        </div>
                        <div className="rect2">
                            <p className="ins4">连接 | 学院精英</p>
                        </div>
                        <div className="rect3">
                            <p className="ins3">分享 | 校园知识 </p>
                        </div>
                        <Button className="enterbtn1"><a>Enter Now</a></Button>
                    </div>
                    <div>
                        <img src={home_3_} width="1519px" height="800px" style={{opacity:0.4}}/>
                        <img src={home_3} width="1519px" height="800px" style={{zIndex:-1, marginTop:"-825px"}}/>
                        <Button className="enterbtn2"><a>Enter Now</a></Button>
                        <div className="soybeanhelpyou1" align="left">
                            <p>黄豆</p>
                            <p>帮你更了解自己</p>
                        </div>
                        <div className="soybeanhelpyou2" align="left">
                            <p>黄豆</p>
                            <p>帮你更了解自己</p>
                        </div>
                        <div className="circle1">
                            <p className="zhuanye">专业</p>
                        </div>
                        <div className="circle2">
                            <p className="xingge">性格</p>
                        </div>
                        <div className="circle3">
                            <p className="xihao">喜好</p>
                        </div>
                    </div>
                    <div>
                        <img src={home_4} width="1519px" height="800px" style={{marginTop:"-21px"}}/>
                        <p className="aboutus">About Us</p>
                        <div className="insbox"/>
                    </div>
                </Content>
                <Footer style={{ textAlign:'center' }}>Soybean Knowledge ©2019 Created by Endless NIght Seclusion</Footer>
            </Layout>
        </div>
      );
    }
  }


export default App;












