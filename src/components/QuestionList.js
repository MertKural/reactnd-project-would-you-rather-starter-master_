import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Question from './Question'

class QuestionList extends React.Component {
    state = {
        toggle: true
    }

    toggleHandler = () => {
        this.setState((currentState) => ({
            toggle: !currentState.toggle
        }))

    }

    render() {
        const { unansweredQuestions, answeredQuestions } = this.props
        if (this.props.authedID === null) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <ul className='dashboard-list'>
                    <button onClick={this.toggleHandler}>Switch {this.state.toggle ? 'Answered' : 'Unanswered'}</button>
                    {this.state.toggle ?
                        <div>
                            <h1>Unanswered Questions:</h1>
                            {unansweredQuestions.length === 0 ? `You've Answered All Questions. Good Job!` :

                                <div> {
                                    unansweredQuestions.map((question) => (
                                        <li key={question.id}>
                                            <Question id={question.id} />
                                            <br></br>
                                        </li>
                                    ))
                                } </div>

                            }

                        </div>
                        : <div>
                            <h1>Answered Questions:</h1>
                            {answeredQuestions.map((question) => (
                                <li key={question.id}>
                                    <Question id={question.id} />
                                </li>
                            ))}
                        </div>
                    }
                </ul>
            </div>
        );
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