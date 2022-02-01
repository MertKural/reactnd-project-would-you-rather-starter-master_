import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { Fragment } from 'react';
import { Component } from 'react'
import { connect } from 'react-redux';
import { handleInitData } from '../actions/shared'
import LeaderBoard from './LeaderBoard';
import NavigationBar from './NavigationBar';
import { LoadingBar } from 'react-redux-loading-bar';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import QuestionList from './QuestionList'
import Questions from './Questions'
import AddQuestion from './AddQuestion'
import LoginPage from './LoginPage';


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <NavigationBar logout = {this.handleLogOut} />
            {this.props.login === true? 
            <LoginPage/>
          :
          <div>
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
