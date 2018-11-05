import React, { Component } from 'react';
import './App.css';
import data from './user.json'
import {connect} from 'react-redux';
import * as actions from './actions/actions';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profileList: {},
      followList:[],
      posts: [],
      users: []
    }
  }

  componentDidMount() {
    this.props.loadData(data.data);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profileList: nextProps.profileList,
      followList:nextProps.followList,
      posts: nextProps.posts,
      users: nextProps.users
    })
  }

  showUsers = () => {
    $("#chngUsers").toggleClass('display-none');
    $(".change-user i").toggleClass('rotate-180');
  }

  changeUser = (id) => {
    this.props.changeUser(id);
  }

  changeFollow = (id) => {
    this.props.changeFollower(id);
  }

  postIt = () => {
    let postContent = document.getElementById('txtContent').value;
    if(postContent.trim().length > 0){
      let content = {
        "content": postContent,
        "postId": 12347,
        "postProImg": this.state.profileList.profileImg,
        "postTime": new Date().toISOString(),
        "postImg":""
      }
      this.props.postComment(content);
      document.getElementById('txtContent').value = '';
    }
  }

  dateFomat = (dt) => {
    let mons = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    let nwDt = new Date(dt);
    
    return days[nwDt.getDay()]+', '+nwDt.getDate()+' '+mons[nwDt.getMonth()]+' '+nwDt.getHours()+':'+nwDt.getMinutes();
  }

  render() {
    return (
      <div className="App">
        <div className="small-con profile">
          <div className="main-profile">
            <img alt='alt' src={this.state.profileList.bgImg} className="bg-img" />
            <img alt='alt' src={this.state.profileList.profileImg} className="main-pro-img circle"/>
            <h2>{this.state.profileList.profileName}</h2>
            <div className="counters">
              <div>
                <span>{this.state.profileList.posts}</span>
                <span>POSTS</span>
              </div>
              <div>
                <span>{this.state.profileList.following}</span>
                <span>FOLLOWING</span>
              </div>
            </div>
          </div>
          <div className="login-profile">
            <h3>Logged in as</h3>
            <div>
              <img alt='alt' src={this.state.profileList.profileImg} className="pro-img circle"/>
              <span className="pro-name">{this.state.profileList.profileName}</span>
            </div>
            <div className="change-user" onClick={() => this.showUsers()}>
              Change User <i className="fas fa-angle-right"></i>
            </div>
            <div id="chngUsers" className="change-user-list display-none">
              {
                this.state.users && this.state.users.map((user, idx) => (
                  <li key={idx} onClick={() => this.changeUser(user.userId)} className={user.userId === this.state.profileList.profileId ? 'active' : ''}>
                    <img alt='alt' src={user.userImg}width="50px" className="circle"/>  
                    <span>{user.userName}</span>
                  </li>
                ))
              }
            </div>
          </div>
        </div>
        <div className="large-con">
          <div className="post-it">
            <div className="post-elms">
              <img alt='alt' src={this.state.profileList.profileImg} className="circle"/>
              <textarea placeholder="What's happening?" id="txtContent"></textarea>
            </div>
            <input type="button" value="Post" className="btn-post" onClick={() => this.postIt()}></input>
          </div>
          {
            this.state.posts && this.state.posts.map((post, idx) =>(
              <div key={idx} className="posts">
                <img alt='alt' src={post.postProImg} className="pro-img circle"/>
                <div className="post-content">
                  <span className="post-date">{this.dateFomat(post.postTime)}</span>
                  <span>{post.content}</span>
                  {
                    post.postImg !== '' ? <img alt='alt' src={post.postImg} className="post-img"/> : ''
                  }
                </div>
              </div>
            ))
          }
        </div>
        <div className="small-con followers">
          <li>Follow Users</li>
          {
            this.state.followList && this.state.followList.map((user, idx) => (
              <li key={idx}>
                <img alt='alt' src={user.userImg} /> <span className="follow-name">{user.userName}</span> 
                <span className="icon" onClick={() => this.changeFollow(user.userId)}><i className={user.isFollow ? "fas fa-check" : "fas fa-user-plus"}></i></span>
              </li>
            ))
          }
        </div> 
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    followList: state.followUsers,
    profileList: state.profile,
    posts: state.posts,
    users: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadData: function(data){
      actions.loadData(dispatch, data);
    },
    changeUser: function(id) {
      actions.changeUser(dispatch, id);
    },
    changeFollower: function(userId){
      actions.changeFollower(dispatch, userId);
    },
    postComment: function(contnt) {
      actions.postComment(dispatch, contnt);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
