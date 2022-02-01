import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom'

class Question extends React.Component{
    render(){
        const { question, user } = this.props

        if (question === null) {
            return <p>This Question Doesn't Exist</p>
        }

        const { author, id } = question

        return (
            <Link to={`/questions/${id}`} >
            <div>
                <img
                    src={user.avatarURL}
                    alt={`Avatar of ${author}`}
                    className='avatar'
                />
                <div>
                    <span>{user.name} asks:</span>
                </div>
                <div>
                    <span>Would You Rather...?</span>
                </div>
            </div>
            </Link>
        )
    }
}

const mapStateToProps = ({ questions, users }, { id }) => {
    const question = questions[id]
    const user = question ?
        users[question.author] : null

    return {
        user,
        question: question ?
            question : null
    }
}

export default withRouter(connect(mapStateToProps)(Question));