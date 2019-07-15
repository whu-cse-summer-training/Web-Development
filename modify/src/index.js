import React from 'react';
import ReactDOM from 'react-dom';
import './userspace.css';


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
    Upload,
    Modal,
    Form,
    Tooltip,
    Radio,
    Button,
    DatePicker,
    Select,
} from 'antd';
import user_backgroung from './meterials/user-background.jpg';
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
const { Option } = Select;
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

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class RegistrationForm extends React.Component{

      state = {
        previewVisible: false,
        previewImage: '',
        fileList: [

        ],
          value: 1,
          confirmDirty: false,
          autoCompleteResult: [],
      };

      handleCancel = () => this.setState({ previewVisible: false });

      handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
      };

      handleChange = ({ fileList }) => this.setState({ fileList });

      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };


    render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div className="model">
        <Icon type="plus" />
        <div className="ant-upload-text">上传头像</div>
      </div>
    );
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 8 },
    };
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
                <Content style={{height:'800px', margin:'auto', left:0, right:0,}}>
                    <img src={user_backgroung} />
                        <div className="grayblock">
                          <div className="clearfix">
                            <Upload
                              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              listType="picture-card"
                              className="uploader"
                              fileList={fileList}
                              onPreview={this.handlePreview}
                              onChange={this.handleChange}
                            >
                              {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} >
                              <img alt="example" style={{ width: '100%', height:'80%' }} src={previewImage} />
                            </Modal>
                          </div>
                          <div className="table">
                                    <Form {...formItemLayout} onSubmit={this.handleSubmit} >
                                    <Form.Item
                                      label={
                                        <span>
                                          昵称&nbsp;
                                          <Tooltip title="What do you want others to call you?">
                                            <Icon type="question-circle-o" />
                                          </Tooltip>
                                        </span>
                                      }
                                    >
                                      {getFieldDecorator('nickname', {
                                        rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
                                      })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="性别" style={{fontSize:'26px'}}>
                                    {getFieldDecorator('radio-group')(
                                        <Radio.Group>
                                        <Radio value={0}>男</Radio>
                                        <Radio value={1}>女</Radio>
                                        <Radio value={2}>保密</Radio>
                                      </Radio.Group>
                                    )}
                                    </Form.Item>
                                    <Form.Item label="生日">
                                      {getFieldDecorator('Birth-day')(
                                        <DatePicker defaultValue={moment('2000/01/01', dateFormat)} format={dateFormat} />
                                       )}
                                    </Form.Item>
                                    <Form.Item label="学校" hasFeedback>
                                      {getFieldDecorator('select1', {
                                        rules: [{ required: true, message: '请选择你的学校!' }],
                                      })(
                                        <Select placeholder="点击选择学校">
                                          <Option value="whu">武汉大学</Option>
                                        </Select>,
                                      )}
                                    </Form.Item>
                                    <Form.Item label="专业">
                                      {getFieldDecorator('input', {
                                        rules: [{ required: true, message: '请选择你的专业!' }],
                                        })(
                                        <Input placeholder="请输入专业" />
                                       )}
                                    </Form.Item>
                                    <Form.Item label="学历" hasFeedback>
                                      {getFieldDecorator('select2', {
                                        rules: [{ required: true, message: '请选择你的学历!' }],
                                      })(
                                        <Select placeholder="点击选择学历">
                                          <Option value="0">本科在读</Option>
                                          <Option value="1">硕士在读</Option>
                                          <Option value="2">博士在读</Option>
                                          <Option value="3">已毕业</Option>
                                        </Select>,
                                      )}
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                      <Button type="primary" htmlType="submit">
                                      确认修改
                                      </Button>
                                    </Form.Item>
                                  </Form>
                          </div>
                        </div>
                </Content>
                <Footer className="foot" style={{ textAlign:'center',width:'1519px', margin:'auto', left:0, right:0, }}>Soybean Knowledge ©2019 Created by Endless NIght Seclusion</Footer>
            </Layout>
        </div>
      );
    }
  }


const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

ReactDOM.render(<WrappedRegistrationForm />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
export default RegistrationForm;
