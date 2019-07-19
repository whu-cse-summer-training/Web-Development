//问题详情页
//这一页可以点击查看每个回答的详情，也可以链接到写回答的页面
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './question.css';
import {
    Layout,
    Menu,
    Row,
    Col,
    Icon,
    Card,
    Input,
    Dropdown,
    Avatar,
    Tag,
    List,
    Button,
    Carousel } from 'antd';
import Community_2 from './material/community_2.jpg';

class App extends React.Component {
//默认状态：点赞，踩，收藏，评论，时间等    
  constructor(props){
    super(props)
    this.state={
      star:100,
      stared:'null',
      like:100,
      liked:'null',
      dislike:100,
      disliked:'null',
      visible: false,
      childrenDrawer: false,
      data: [],
      loading: false,
      hasMore: true,
      comments: [ ],
      submitting: false,
      value: '',
    };
  }

render() {
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
const sectionStyle = {
    display:'inline-block',height:'1540px', backgroundImage:`url(` +Community_2 + `)`,
};
//以卡片的样式展示问题的内容    
const { Meta } = Card;
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
const listData = [];
for (let i = 0; i < 50; i++){
    listData.push({
        href:' ',
        title:`用户id ${i}`,
        avatar: ' ',
        content:'这里显示回答',
    });
}

    return(
        <div className="thequestion">
                <Header style={{position: 'fixed', zIndex:1,width:'1519px', margin:'auto', left:0, right:0, background:'white'}}>
                        <Row type="flex" justify="start">
                            <Col span={3} offset={0}>
                                <div className="homelogo">
                                    <a href="../public/index.html"><Icon type="home" style={{color:'black'}}/></a>
                                    <a href='../public/index.html' style={{color:'black',fontSize:'30px'}}>home</a>
                                </div>
                            </Col>
                            <Col span={3} offset={2}>
                                <div className="smilesoybean">
                                    <a href=""><Icon type="smile" theme="filled" style={{color:'black'}}/></a>
                                    <a href="" style={{color:"black",fontSize:'30px'}}>huangdou</a>
                                </div>
                            </Col>
                            <Col span={4} offset={2}>
                                <div className="webname">
                                    <p>黄豆 | 知识</p>
                                </div>
                            </Col>
                            <Col span={3} offset={2}>
                                <div className="search">
                                    <Search
                                        placeholder="搜索"
                                        onSearch={value =>console.log(value)}
                                        style={{width:"250px",height:"40px" }}
                                    />
                                </div>
                            </Col>
                            <Col span={2} offset={3}>
                                <div>
                                    <Dropdown overlay={menu}>
                                        <div className="userlogo">
                                            <Avatar icon="user" src='' className="ant-dropdown-link" href="#" style={{color:'black', backgroundColor:"white", fontSize:"30px"}} />
                                            <Icon type="down"/>
                                        </div>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                </Header>
                <Layout style={{height:"1550px"}}>
                    <div style={sectionStyle} className="background">
                        <div className="question">
                          <Card
                            className="card1"
                            actions={[
                                <IconText type="clock-circle" text="这里显示提问时间"/>,
                                <IconText type="edit" text="这里显示回答数" />,
                                <a href=" "><IconText type="highlight" text="我来回答"/></a> ]}
                          >
                            <Meta
                              style={{marginLeft:"50px", marginTop:"10px", height:"60px", fontSize:"25px", color:"black"}}
                              description="这里是问题标题"
                            />
                             <h3>这里是问题描述</h3>
                            <div>
                              <Tag color="orange">tag1</Tag>
                              <Tag color="orange">tag2</Tag>
                              <Tag color="orange">tag3</Tag>
                            </div>
                          </Card>
                        </div>
                        <Content>
                            <div className="display">
                                <List
                                    className="answers"
                                    itemLayout="vertical" size="large"
                                    pagination={{ onChange: page =>{console.log(page);}, pageSize:6 }}
                                    dataSource={listData}
                                    renderItem={ item => (
                                        <List.Item key={item.title}
                                            actions={[
                                                <IconText type="like" text="0" />,
                                                <IconText type="dislike" text="0" />,
                                                <IconText type="star" />,
                                                <IconText type="message" text="0" />,
                                                <IconText type="clock-circle" text="回答时间"/>]}
                                        >
                                            <List.Item.Meta
                                                avatar={<Avatar className="useravatar" src={item.avatar} />}
                                                title={item.title}
                                            />
                                            <Button type="dashed" block style={{textAlign:"left",overflow:"hidden"}} href={item.href}>{item.content}</Button>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Content>
                        <Sider width={400} className="banner">
                            <Carousel autoplay>
                                <div>
                                    <h3>3</h3>
                                </div>
                                <div>
                                    <h3>2</h3>
                                </div>
                                <div>
                                    <h3>1</h3>
                                </div>
                                <div>
                                    <h3>4</h3>
                                </div>
                            </Carousel>
                        </Sider>
                    </div>
                </Layout>
                <Footer className="foot" style={{ textAlign:'center',width:'1519px', margin:'auto', left:0, right:0}}>
                    Soybean Knowledge ©2019 Created by Endless Night Seclusion
                </Footer>
        </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
