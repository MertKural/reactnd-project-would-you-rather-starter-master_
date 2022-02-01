import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom'

class Question extends React.Component{
    render(){
        const {question, user} = this.props
        const {author, id} = question 

        if(question === null){
            return <p>Question Could't Found</p>
        }
        return(
            <Link to={`/questions/${id}`}>
                <img
                    src={user.avatarURL}
                    className='avatar'
                />
                <div>
                    <span>{user.name} wondering:</span>
                </div>
                <div>
                    <span>Would You Rather...?</span>
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