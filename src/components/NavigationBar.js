import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'


const NavigationBar = props => {
    return (
        <nav className='nav'>
            <ul>
                <div>{props.authedUser?
                    <div>Hello, {props.authedUser}   <br></br>
                    <a href="/" onClick={props.logout}>LogOut</a>
                    </div>
                    :null}
                </div>
                <li>
                    <NavLink to='/' exact activeClassName='active'>HOME</NavLink>
                </li>
                <li>
                    <NavLink to='/add' exact activeClassName='active'>NEW QUESTION</NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' exact activeClassName='active'>LEADERBOARD</NavLink>
                </li>
            </ul>
        </nav>

    )
}

const mapStateToProps = ({ authedUser, users }, { logout }) => {

    return {
      authedUser: !!authedUser ? users[authedUser].name : null,
      logout
    }
  }
  
  export default connect(mapStateToProps)(NavigationBar);