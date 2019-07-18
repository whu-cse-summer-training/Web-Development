//写回答
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './write-answer.css';
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
    Tooltip,
    Button,
    Upload,
    message,
    Carousel } from 'antd';
//背景图片	
import Community_2 from './material/community_2.jpg';
import moment from 'moment';
//限制答案配图的格式和大小
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('您只能上传JPG文件(.›ᴗ‹.)!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('您的图片太大了!(>2MB)');
  }
  return isJPG && isLt2M;
}
class App extends React.Component {
  constructor(props){
    super(props);
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
  //上传一张图片
  handleChange = info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    this.setState({ fileList });
  };

render() {
//整体布局	
const { Header, Footer, Sider, Content } = Layout;
//搜索框
const { Search } = Input;
//下拉菜单
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
//问题的内容以卡片的格式展现
const { Meta } = Card;
//写答案的输入栏
const { TextArea } = Input;
//定义icon+text的格式用来展示时间、回答数等内容
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
const props = {
	  //上传的地址json，包括"name""status""url""thumbUrl"
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleChange,
      listType: 'picture',
	  //判断上传图是否合法
      beforeUpload: beforeUpload,
    };
    return(
        <div className="write">
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
                                <IconText type="edit" text="这里显示回答数" /> ]}
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
                                <Card className="card2" >
                                    <Meta
									  //用户头像
                                      avatar={<Avatar size={"large"} src=" " />}
									  //用户ID
                                      title={<h2>ID</h2>}
									  //当前时间
                                      description={
                                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                          <span>{moment().fromNow()}</span>
                                        </Tooltip>}
                                    />
                                    <div>
                                      <div style={{ margin: '24px 0' }} />
                                        <TextArea
                                          placeholder="Write Your Answer Here..."
										  //这里动态设置输入框的行数[20,35]，超过35行则出现穿梭滑块
                                          autosize={{ minRows: 20, maxRows: 35 }}
                                        />
                                    </div>
                                    <div style={{ margin: '24px 0' }} />
                                    <Upload {...props} fileList={this.state.fileList}>
                                        <Button type="primary" shape="round" icon="upload" size="large">
                                            上传图片
                                        </Button>
                                    </Upload>
                                    <br/>
                                    <Button type="primary" shape="round" icon="check" size="large" href=" ">
                                      确认发布
                                    </Button>
                                </Card>
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