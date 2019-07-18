import React, {Component} from 'react';
import './UserLogo.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import {Avatar, Icon} from "antd";

class ConTent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            this.props.user.map((content)=>{
                return(
                    <div className="userlogo">
                        <Avatar icon="user" src={content.avatar} className="ant-dropdown-link" href="#" style={{background:"black"}} />
                        <Icon type="down"/>
                    </div>
                )
        })
        )
    }
}

class UserLogo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:[]
        }
    }
    componentDidMount(){
        const _this=this;
        axios.post('http://127.0.0.1:8000/api/users/simple_info/')
            .then(function(response){
                _this.setState({
                    user:response.data
                });
                console.log(this.state.user);
            })
            .catch(function(error){
                console.log(error);
                _this.setState({
                    error:error
                })
            })
    }

    render(){
        return(
            <ConTent user={this.state.user}/>
        )
    }
}

export default UserLogo;