//欢迎页
//可登录
//可跳转至其他页面
import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Row, Col, Icon, Input, Dropdown, Button, Form, Checkbox, Modal } from 'antd';
import UserLogo from './UserLogo';
import home_1 from './material/home_1.jpg';
import home_2 from './material/home_2.jpg';
import home_3 from './material/home_3.jpg';
import home_3_ from './material/home_3.1.jpg';
import home_4 from './material/home_4.jpg';
import axios from 'axios';

axios.defaults.basseURL = 'https://localhost:8000/api/';

let login = axios.create({
    timeout: 1000,
});

//const声明一个只读的常量。一旦声明，常量的值就不能改变
const { Search } = Input;
const { Header,Content, Footer } = Layout;
//登录时弹出表单
//获取表单内容
//封装成一个类
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form action="https://localhost:3000/api/users/login" onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


class App extends Component{

    state = {
    visible: false
  };
//点击后弹窗
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false });
  };

    render() {
        const { visible }= this.state;
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
                                <Dropdown overlay={(<Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="" style={{textAlign:'center'}}>个人主页</a>
        </Menu.Item>
        <Menu.Item>
            <Button style={{borderColor:'white', backgroundColor:'white', color:'grey'}}
                    type='primary' target='_blank' rel='noopener noreferrer' onClick={this.showModal}>
                登录
            </Button>
            <Modal
                visible={visible}
                title="登录"
                onCancel={this.handleCancel}
                footer={null}
            >
                <div className='login_'>
                    <WrappedNormalLoginForm />
                </div>
            </Modal>
        </Menu.Item>
    </Menu>)}>
                                    <UserLogo />
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
                        <Button className="enterbtn1" style={{height:'200px', backgroundColor:'yellow'
                                                                , borderColor:'black', fontSize:'50px', borderWidth: '6px', borderRadius:'20%'}}>
                            <a>Enter Now</a>
                        </Button>
                    </div>
                    <div>
                        <img src={home_3_} width="1519px" height="800px" style={{opacity:0.4}}/>
                        <img src={home_3} width="1519px" height="800px" style={{zIndex:-1, marginTop:"-825px"}}/>
                        <Button className="enterbtn2" style={{height:'180px', fontSize:'45px', borderColor:'cornflowerblue',
                                                                borderWidth:'6px',borderRadius:'20%'}}>
                            <a>Enter Now</a>
                        </Button>
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












