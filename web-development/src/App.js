import React, { Component } from 'react';
import homelogo from './homelogo.png';
import smile from './smile.png';
import userlogo from './userlogo.png';
import searchlogo from './search.png';
import './App.css';

class App extends Component {
  render(){
	return (
		<div className="App">
            <div id='fixed-menu' className="menu">
                <a href=""><img src={homelogo} className="App-homelogo" alt="home" align="left"/></a>
                <a className="home" href="" ><p className="home" align="left">HOME</p></a>
                <a><img src={smile} className="smile" align="left"/></a>
                <p className="huangdou" align="left">huangdou</p>
                <p className="name" align="left">黄豆|知识</p>

                <a href=""><img src={userlogo} className="userlogo" align="left"/></a>

                <form action="" className="parent">
                    <input type="text" className="search" placeholder="搜索"/>
                    <input name="imgbtn" type="image" src={searchlogo} className="btn" onClick="this.form.action='';this.form.submit()"/>
                </form>
            </div>

            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
            <p>123456789</p>
		</div>
	);
  }
}

export default App;
