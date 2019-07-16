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
    Card,
    Input,
    Dropdown,
    Avatar,
    List,
    Button,
    Drawer,
    message,
    Spin,
    Comment,
    Form,
    Carousel } from 'antd';
import Community_2 from './material/community_2.jpg';
import reqwest from 'reqwest';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const { TextArea } = Input;
const CommentList = ({comments}) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        确定
      </Button>
    </Form.Item>
  </div>
);

class App extends React.Component {
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
  islike =()=>{
    let liked=this.state.liked;
    if(liked){
      if(liked==='like'){
        this.setState({liked:null})
        this.setState({like:this.state.like-1});
      }
      else
      {
        this.setState({liked:'like'});
        this.setState({ like:this.state.like+1,});
      }
    }
    else {
      this.setState({
        like:this.state.like+1,
      });
      this.setState({liked:'like'});
    }
  };
  isdislike =()=>{
    let disliked=this.state.disliked;
    if(disliked){
      if(disliked==='dislike'){
        this.setState({disliked:null})
        this.setState({dislike:this.state.dislike-1});
      }
      else
      {
        this.setState({disliked:'dislike'});
        this.setState({dislike:this.state.dislike+1,});
      }
    }
    else {
      this.setState({
        dislike:this.state.dislike+1,
      });
      this.setState({disliked:'dislike'});
    }
  };
  isstar =()=>{
    let stared=this.state.stared;
    if(stared){
      if(stared==='star'){
        this.setState({stared:null})
        this.setState({star:this.state.star-1});
      }
      else
      {
        this.setState({stared:'star'});
        this.setState({ star:this.state.star+1,});
      }
    }
    else {
      this.setState({
        star:this.state.star+1,
      });
      this.setState({stared:'star'});
    }
  };

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

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results,
      });
    });
  }

  fetchData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res);
      },
    });
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('到底了');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: ' ',
            avatar: ' ',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };


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
const { Meta } = Card;
const listData = [];
  listData.push({
    href: ' ',
    title: '昵称/点击进入个人主页',
    avatar: ' ',
    description:'这里是回答的时间',
    content:
      '这里显示回答的内容！！！！！！！！！！！！！！！！！！！！！！！！！！！！！(不能超过45行，不然下面就出界了)！！！！！！！！！！！！！！！！！！！！！！(不能超过45行，不然下面就出界了)！！！！！！！！！！！！！！！！！！！！！！(不能超过45行，不然下面就出界了)我也莫得办法鸭'
  });
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
const { comments, submitting, value } = this.state;
    return(
        <div className="theanswer">
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
                                <a href=" "><IconText type="ellipsis" text="点击查看问题详情"/></a> ]}
                          >
                            <Meta
                              style={{marginLeft:"50px", marginTop:"10px", height:"60px", fontSize:"25px", color:"black"}}
                              description="这里是问题标题"
                            />
                            这里是问题描述的缩略
                          </Card>
                        </div>
                        <Content>
                            <div className="display">
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    className="answer"
                                    dataSource={listData}
                                    footer={
                                      <div>
                                        <b>soybean konwledge|</b> You can comment on the right
                                      </div>
                                    }
                                    renderItem={item => (
                                      <List.Item
                                        key={item.title}
                                        actions={[
                                          <div style={{width:60,float:"left"}}>
                                            <Icon onClick={this.islike} type='like' theme={this.state.liked==='like' ?'filled':''}/>
                                            {this.state.like}
                                          </div>,
                                          <div style={{width:60,float:"left"}}>
                                            <Icon onClick={this.isdislike} type='dislike' theme={this.state.disliked==='dislike' ?'filled':''}/>
                                            {this.state.dislike}
                                          </div>,
                                          <div style={{width:60,float:"left"}}>
                                            <Icon onClick={this.isstar} type='star' theme={this.state.stared==='star' ?'filled':''}/>
                                            {this.state.star}
                                          </div>,
                                          <div style={{width:60,height:"27px",float:"left"}}>
                                                <Button type="link" style={{fontSize:"12px"}} onClick={this.showDrawer}>
                                                  <IconText type="message" text="这里显示评论数" />
                                                </Button>
                                              </div>,
                                        ]}
                                      >
                                        <List.Item.Meta
                                          avatar={<Avatar src={item.avatar} />}
                                          title={<a href={item.href}>{item.title}</a>}
                                          description={item.description}
                                        />
                                        {item.content}
                                      </List.Item>
                                    )}
                                />
                                <div>
                                              <Drawer
                                                  title="评论"
                                                  width={520}
                                                  closable={false}
                                                  onClose={this.onClose}
                                                  visible={this.state.visible}
                                                >
                                                  <Drawer
                                                    title="写评论"
                                                    width={320}
                                                    closable={false}
                                                    onClose={this.onChildrenDrawerClose}
                                                    visible={this.state.childrenDrawer}
                                                  >
                                                    <div>
                                                      {comments.length > 0 && <CommentList comments={comments} />}
                                                      <Comment
                                                        avatar={
                                                          <Avatar
                                                            src=" "
                                                            alt=" "
                                                          />
                                                        }
                                                        content={
                                                          <Editor
                                                            onChange={this.handleChange}
                                                            onSubmit={this.handleSubmit}
                                                            submitting={submitting}
                                                            value={value}
                                                          />
                                                        }
                                                      />
                                                    </div>
                                                  </Drawer>
                                                  <div
                                                    style={{
                                                      position: 'absolute',
                                                      bottom: 100,
                                                      width: '100%',
                                                      borderTop: '1px solid #e8e8e8',
                                                      padding: '10px 16px',
                                                      textAlign: 'left',
                                                      left: 0,
                                                      background: '#fff',
                                                      borderRadius: '0 0 4px 4px',
                                                    }}
                                                    className="demo-infinite-container">
                                                      <InfiniteScroll
                                                        initialLoad={false}
                                                        pageStart={0}
                                                        loadMore={this.handleInfiniteOnLoad}
                                                        hasMore={!this.state.loading && this.state.hasMore}
                                                        useWindow={false}
                                                      >
                                                        <List
                                                          dataSource={this.state.data}
                                                          renderItem={item => (
                                                            <List.Item key={item.id}>
                                                              <List.Item.Meta
                                                                avatar={
                                                                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                                }
                                                                title={<a href="https://ant.design">{item.name.last}</a>}
                                                                description={item.email}
                                                              />
                                                              <div>时间</div>
                                                            </List.Item>
                                                          )}
                                                        >
                                                          {this.state.loading && this.state.hasMore && (
                                                            <div className="demo-loading-container">
                                                              <Spin />
                                                            </div>
                                                          )}
                                                        </List>
                                                      </InfiniteScroll>
                                                  </div>
                                                  <div
                                                    style={{
                                                      position: 'absolute',
                                                      bottom: 0,
                                                      width: '100%',
                                                      borderTop: '1px solid #e8e8e8',
                                                      padding: '10px 16px',
                                                      textAlign: 'right',
                                                      left: 0,
                                                      background: '#fff',
                                                      borderRadius: '0 0 4px 4px',
                                                    }}
                                                  >
                                                    <Button
                                                      style={{
                                                        marginRight: 8,
                                                      }}
                                                      onClick={this.onClose}
                                                    >
                                                      Cancel
                                                    </Button>
                                                    <Button onClick={this.onClose} type="primary" onClick={this.showChildrenDrawer}>
                                                      评论
                                                    </Button>
                                                  </div>
                                              </Drawer>
                                </div>
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