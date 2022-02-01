import React from 'react'
import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleQuestionAnswer} from '../actions/questions'

class Questions extends React.Component{

    state = {
        value: ''
    }


    onChange = (event) =>{
        this.setState({value: event.target.value})
    }

    sendAnswer = (e) => {
        e.preventDefault()
        const {question, dispatch} = this.props
        const {value} = this.state

        dispatch(handleQuestionAnswer(
            question.id,
            value
        ))
    }



    render(){

        const { question, answer, questionAuthor} = this.props
        const {value} = this.state 

        if (question === null){
            return <p>There is no such question</p>
        }

        const results = {
            totalVotes: question.optionOne.votes.length + question.optioonTwo.votes.length ,
            optionOneVotes: question.optionOne.votes.length,
            optionTwoVotes: question.optionTwo.votes.length
        }

        const  { optionOne, optionTwo} = question
        const {totalVotes, optionOneVotes, optionTwoVotes} = results


        return(
            <div>
                <img
                    src={questionAuthor.avatarURL}
                    className='avatar'
                />

                {(!!answer)?
                    <div>
                        <div>
                            <div>
                                <span>Option One: {optionOne.text}</span>
                                <div>{((optionOneVotes / totalVotes) * 100).toFixed(2)}%</div>
                                <div>{optionOneVotes} out of {totalVotes} votes</div>
                            </div>
                            <div>
                                <span>Option Two: {optionTwo.text}</span>
                                <div>{((optionTwoVotes / totalVotes) * 100).toFixed(2)}%</div>
                                <div>{optionTwoVotes} out of {totalVotes} votes</div>
                            </div>                            
                        </div>
                    </div>    
             :
            <form onSubmit={this.sendAnswer}>
                <div><span>Would You Rather...</span></div>
                <div className='radio' onChange={this.onChange}>
                    <div><input type='radio' value='optionOne' checked = {value === 'optionOne'}/></div>
                    <div><input type='radio' value='optionTwo' checked = {value === 'optionTwo'}/></div>
                </div>
                <button disabled={value === ''}>Submit</button>
            </form>
}
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser, questions, users }, props) => {
    const { question_id } = props.match.params

    const question = questions[question_id]
    const answers = users[authedUser].answers

    return {
        question: question ? question : null,
        questionAuthor: question ? users[question.author] : null,
        answer: question ? answers[question.id] : null
    }
}

export default withRouter(connect(mapStateToProps)(Questions));
