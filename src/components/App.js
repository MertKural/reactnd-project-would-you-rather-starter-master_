import logo from '../logo.svg';
import '../index.css';
import React from 'react';
import { Fragment } from 'react';
import { Component } from 'react'
import { connect } from 'react-redux';
import LeaderBoard from './LeaderBoard';
import NavigationBar from './NavigationBar';
import LoadingBar  from 'react-redux-loading-bar';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import QuestionList from './QuestionList'
import Questions from './Questions'
import AddQuestion from './AddQuestion'
import LoginPage from './LoginPage';
import {setAuthedUser} from '../actions/authedUsers'
import {handleInitData} from '../actions/shared'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitData())
  }

  handleLogOut = () =>{
    this.props.dispatch(setAuthedUser(
      null
    ))
  }

  render() {
    return (
     
      <Router>
        <Fragment>
        {console.log("Iamhere")}
          <LoadingBar />
          <div className='container'>
            <NavigationBar logout = {this.handleLogOut} />
            {this.props.login === true? 
            <LoginPage/>
            
          :
          <div>
            {console.log("Iamhere3")}
            <Route path='/' exact component = {QuestionList} />
            <Route path='/questions/:question_id' component = {Questions} />
            <Route path='/addQuestion' component = {AddQuestion} />
            <Route path='/leaderboard' component = {LeaderBoard} />
          </div>
          
          }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser}) {
  return {
    login: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
