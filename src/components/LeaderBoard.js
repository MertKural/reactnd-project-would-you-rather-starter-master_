import React, {Component} from 'react'
import {connect} from 'react-redux'

class LeaderBoard extends Component{

    state = {}

    render(){

        const { users } = this.props

        return(
            <div>
            <h1>LeaderBoard</h1>
            <div>
                <ol>
                {users.map((user) => (
                            <li key={user.id}>
                                <div>{user.name}</div>
                                <img
                                    src={user.avatarURL}
                                    className='avatar'
                                />
                                <div>Answered Questions: {Object.keys(user.answers).length}</div>
                                <div>Created Questions: {user.questions.length}</div>
                                <div>Score: {Object.keys(user.answers).length + user.questions.length}</div>
                            </li>
                        ))}
                </ol>
            </div>
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => {
    return {
        users: Object.keys(users).sort((a,b) =>(
            (Object.keys(users[b].answers).length + users[b].questions.length)-
            (Object.keys(users[a].answers).length + users[b].questions.length))).map(key => users[key])
        }
}

export default connect(mapStateToProps)(LeaderBoard);
