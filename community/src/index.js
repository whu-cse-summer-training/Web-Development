//社区页面
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {
    Layout,
    Menu,
    Row,
    Col,
    Icon,
    Input,
    Dropdown,
    List,
    Button,
    Drawer,
    Tooltip,
    Carousel,
    Form,
    Tag,
    Avatar } from 'antd';
import Community_1 from './material/community_1.jpg';
import Community_2 from './material/community_2.jpg';
import { TweenOneGroup } from 'rc-tween-one';

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
//显示词条列表
const listData = [];
for (let i = 0; i < 50; i++){
    listData.push({
        href:' ',
        title:`question ${i}`,
        avatar: ' ',
        description:`ID ${i}`,
        content:'这里显示回答',
    });
}

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

const sectionStyle = {
    display:'inline-block',height:'1540px', backgroundImage:`url(` +Community_2 + `)`,
};
//上弹出抽屉，用来提问题
class DrawerForm extends React.Component {
  state = {
    visible: false,
    tags: [ ],
    inputVisible: false,
    inputValue: '',
  };

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };
//手动输入问题标签
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };
//演示动画
  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => (this.input = input);

  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };
//抽屉
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { tags, inputVisible, inputValue } = this.state;
    const tagChild = tags.map(this.forMap);
    return (
     <div className="community">
        <Layout style={{height:"1550px"}}>
            <Header style={{position: 'fixed', zIndex:1,width:'1519px', margin:'auto', left:0, right:0, background:'white'}}>
                    <Row type="flex" justify="start">
                        <Col span={3} offset={0}>
                            <div className="homelogo">
                                <a href="../public/index.html"><Icon type="home" style={{color:'black'}}/></a>
                                <a href='../public/index.html' style={{color:'black',fontSize:'30px'}}>HOME</a>
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
                                    style={{width:"250px",height:"40px"}}
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
                <div style={sectionStyle} className="background">
                    <div className="ask">
                        <img src={Community_1} className="ph1"/>
                        <Search
                          className="search2"
                          placeholder="在黄豆社区搜索"
                          onSearch={value => console.log(value)}
                          size="large"
                          enterButton />
                        <p className="enjoy">ENJOY YOURSELF IN</p>
                        <p className="huangdou">HuangDou</p>
                        <div style={{marginTop:"-100px",marginLeft:"570px"}}>
                            <Tooltip title="没找到想要的？试试提问吧">
                              <Button
                                  type="primary"
                                  shape="round"
                                  style={{fontSize:"20px",height:"40px"}}
                                  onClick={this.showDrawer}
                              >
                              <Icon type="bulb" style={{fontSize:"25px"}} /> 去提问
                              </Button>
                            </Tooltip>
                            <Drawer
                              title="Ask Question"
                              placement="top"
                              closable={true}
                              height="370px"
                              onClose={this.onClose}
                              visible={this.state.visible}
                            >
                              <Form layout="vertical" hideRequiredMark>
                                <Row gutter={16}>
                                  <Col span={24}>
                                    <Form.Item label="标题">
                                      {getFieldDecorator('标题', {
                                        rules: [{ required: true, message: '请输入问题标题！' }],
                                      })(<Input placeholder="请输入问题标题" />)}
                                    </Form.Item>
                                  </Col>
                                </Row>
                                <Row gutter={16}>
                                  <Col span={24}>
                                    <Form.Item label="问题描述">
                                      {getFieldDecorator('问题描述', {
                                        rules: [{required: true,message: '请输入问题详细描述！',},],
                                      })(<Input placeholder="请输入问题详细描述" />)}
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Form>
                              <div>
                                <div>
                                  <TweenOneGroup
                                    enter={{
                                      scale: 0.8,
                                      opacity: 0,
                                      type: 'from',
                                      duration: 100,
                                      onComplete: e => {
                                        e.target.style = '';
                                      },
                                    }}
                                    leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                                    appear={false}
                                  >
                                    {tagChild}
                                  </TweenOneGroup>
                                </div>
                                {inputVisible && (
                                  <Input
                                    ref={this.saveInputRef}
                                    type="text"
                                    size="small"
                                    style={{ width: 78 }}
                                    value={inputValue}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleInputConfirm}
                                    onPressEnter={this.handleInputConfirm}
                                  />
                                )}
                                {!inputVisible && (
                                  <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                                    <Icon type="plus" /> 新建标签
                                  </Tag>
                                )}
                              </div>
                              <div
                                style={{
                                  position: 'absolute',
                                  left: 0,
                                  bottom: 0,
                                  width: '100%',
                                  borderTop: '1px solid #e9e9e9',
                                  padding: '10px 16px',
                                  background: '#fff',
                                  textAlign: 'right',
                                }}
                              >
                                <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                  取消
                                </Button>
                                <Button onClick={this.onClose} type="primary">
                                  确认发布
                                </Button>
                              </div>
                            </Drawer>
                        </div>
                    </div>
                    <Content>
                        <div className="display">
                            <List
                                className="answers"
                                itemLayout="vertical" size="large"
                                pagination={{ onChange: page =>{console.log(page);}, pageSize:5 }}
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
                                            avatar={<Avatar size="large" className="useravatar" src={item.avatar} />}
                                            title={item.title}
                                            description={item.description}
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
        </Layout>
     </div>
    )
  }
}

const App = Form.create()(DrawerForm);

ReactDOM.render(<App />, document.getElementById('root'));
