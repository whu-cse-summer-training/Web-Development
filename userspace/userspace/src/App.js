//个人主页
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import 'antd/dist/antd.css';
import {
    Layout,
    Menu,
    Row,
    Col,
    Icon,
    Input,
    Dropdown,
    Avatar,
    Tooltip,
    Button,
    Card,
    Descriptions,
    List,
} from 'antd';
import user_backgroung from './material/user-background.jpg';
const { Search } = Input;
const { Header, Content, Footer } = Layout;
const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="">个人主页</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="" >登录</a>
        </Menu.Item>
    </Menu>
);
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: ' ',
    title: `问题 ${i}`,
    avatar: ' ',
    description:
      `问题描述 ${i}`,
    content:
      `回答 ${i}显示在这里`,
  });
}
const listData1 = [];
for (let i = 0; i < 23; i++) {
  listData1.push({
    href: ' ',
    title: `问题 ${i}`,
    description:
      `问题描述 ${i}`,
  });
}
//页头导航标签
const tabListNoTitle = [
  {key: 'tab1',tab: '我的提问',},
  {key: 'tab2',tab: '我的回答',},
  {key: 'tab3',tab: '浏览历史',},
  {key: 'tab4',tab: '我的收藏',},
  {key: 'tab5',tab: '个人资料',},
];
//各个子页面的内容
const contentListNoTitle = {
  tab1: <div align="left" >
      <List
            className="tab1"
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => { console.log(page);},
              pageSize: 6,
            }}
            dataSource={listData1}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText type="clock-circle" text="时间" />,
                  <IconText type="edit" text="2" />,
                ]}
              >
                <List.Item.Meta
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          /></div>,
  tab2: <div align="left" >
      <List
            className="tab2"
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => { console.log(page);},
              pageSize: 6,
            }}
            dataSource={listData}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText type="star-o" text="999" />,
                  <IconText type="like-o" text="666" />,
                  <IconText type="message" text="2" />,
                ]}
                extra={ <img width={272} alt=" "  src=" " /> }
              >
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
                <a href={item.href}>{item.content}</a>
              </List.Item>
            )}
          /></div>,
  tab3: <div align="left" >
      <List
            className="tab3"
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => { console.log(page);},
              pageSize: 6,
            }}
            dataSource={listData}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText type="star-o" text="999" />,
                  <IconText type="like-o" text="666" />,
                  <IconText type="message" text="2" />,
                ]}
                extra={ <img width={272} alt=" "  src=" " /> }
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={item.title}
                  description={item.description}
                />
                <a href={item.href}>{item.content}</a>
              </List.Item>
            )}
          /></div>,
  tab4: <div align="left" >
      <List
            className="tab4"
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => { console.log(page);},
              pageSize: 6,
            }}
            dataSource={listData}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <p><Icon type="star" theme="filled" style={{color:"yellow"}} />999</p>,
                  <IconText type="like-o" text="666" />,
                  <IconText type="message" text="2" />,
                ]}
                extra={ <img width={272} alt=" "  src=" " /> }
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={item.title}
                  description={item.description}
                />
                <a href={item.href}>{item.content}</a>
              </List.Item>
            )}
          /></div>,
  tab5: <div align="left" >
          <Descriptions title="个人资料" bordered className="tab5">
            <Descriptions.Item label="昵称" span={3}>little soybean</Descriptions.Item>
            <Descriptions.Item label="性别" span={3}>保密</Descriptions.Item>
            <Descriptions.Item label="生日" span={3}>2019/07/15</Descriptions.Item>
            <Descriptions.Item label="学校" span={3}>武汉大学</Descriptions.Item>
            <Descriptions.Item label="专业" span={3}>网安</Descriptions.Item>
            <Descriptions.Item label="学历" span={3}>本科在读</Descriptions.Item>
          </Descriptions>
        </div>
};

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
class App extends React.Component {
      state = {
        previewVisible: false,
        previewImage: '',
        fileList: [ ],
        value: 1,
        confirmDirty: false,
        autoCompleteResult: [ ],
        key: 'tab',
		//默认状态是tab5，即个人信息
        noTitleKey: 'tab5',
      };

      onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
      };

    render() {
      return (
        <div className="App">
            <Layout>
                <Header style={{position: 'fixed', zIndex:1,width:'1519px', margin:'auto', left:0, right:0, background:'white'}}>
                    <Row type="flex" justify="start">
                        <Col span={3} offset={0}>
                            <div className="homelogo">
                                <a href="./test.html"><Icon type="home" style={{color:'black'}}/></a>
                                <a href="" style={{color:'black',fontSize:'30px'}}>home</a>
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
                                <p>黄豆 | 知识</p>
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
                                        <Avatar icon="user" src='' size={"large"} href="#" className="ant-dropdown-link" style={{background:"black"}} />
                                        <Icon type="down"/>
                                    </div>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Content style={{height:'1600px', margin:'auto', left:0, right:0,}}>
                    <img src={user_backgroung} />
                    <div>
                        <div className="gray1"></div>
                            <Avatar size={128} style={{border:"2px solid black", marginTop:"-1100px", marginLeft:"-600px"}} icon="user" src=" " />
                        <div className="ID">little soybean</div>
                        <div className="link">
                           <Tooltip title="修改个人信息">
                           <Button type="link" href=" "><Icon type="schedule" style={{fontSize:"40px"}}/></Button>
                           </Tooltip>
                        </div>
                    </div>
                    <div>
                        <Card
                          className="card"
                          tabList={tabListNoTitle}
                          activeTabKey={this.state.noTitleKey}
                          onTabChange={key => {
                            this.onTabChange(key, 'noTitleKey');
                          }}
                        >
                          {contentListNoTitle[this.state.noTitleKey]}
                        </Card>
                    </div>
                </Content>
                <Footer className="foot" style={{ textAlign:'center',width:'1519px', margin:'auto', left:0, right:0, }}>Soybean Knowledge ©2019 Created by Endless NIght Seclusion</Footer>
            </Layout>
        </div>
      );
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));
