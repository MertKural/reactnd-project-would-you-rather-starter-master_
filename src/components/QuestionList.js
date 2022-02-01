import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Question from './Question'

class QuestionList extends React.Component {
    state = {
        switch: true
    }

    switchHandler = () => {
        this.setState((currentState) => ({
            toggle: !currentState.toggle
        }))

    }

    render() {
        if (this.props.authedID === null) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <ul className='dashboard-list'>
                    <button onClick={this.switchHandler}>Switch {this.state.switch ? 'Answered' : 'Unanswered'}</button>
                    {this.state.switch ?
                        <div>
                            <h1>Unanswered Quesions</h1>
                            {this.props.unansweredQuestions.length === 0 ? 'You answered all of the questions' :
                                <div>
                                    {
                                        this.props.unansweredQuestions.map((q) => (
                                            <li key={q.id}>
                                                <Question id={q.id} />
                                            </li>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                        :
                        <div>
                            <h1>Answered Questions:</h1>
                            {this.props.answeredQuestions.map((q) => (
                                <li key={q.id}>
                                    <Question id={q.id} />
                                </li>
                            ))}
                        </div>
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser, questions, users }) => {
    const user = users[authedUser]
    const answers = user.answers
    return {
        answeredQuestions: Object.values(questions).filter((question) => {
            for (var key in answers) {
                if (question.id === key) {
                    return true;
                }
            }
            return false;
        }).sort((a, b) => b.timestamp - a.timestamp),
        unansweredQuestions: Object.values(questions).filter((question) => {
            for (var key in answers) {
                if (question.id === key) {
                    return false;
                }
            }
            return true;
        }).sort((a, b) => b.timestamp - a.timestamp)
    }
}

export default connect(mapStateToProps)(QuestionList)