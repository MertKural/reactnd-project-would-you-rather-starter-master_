import React from 'react'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {addQuestion} from '../actions/questions'

class AddQuestion extends React.Component{

    state = {
        questionOne: '',
        questionTwo: '',
        toDashboard: false
    }

    handleQuestionOneChange = e => {
        const questionOne = e.target.value
        this.setState(() => ({  questionOne }))
    }

    handleQuestionTwoChange = e => {
        const questionTwo = e.target.value
        this.setState(() => ({  questionTwo }))
    }

    handleSendAnswer = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        const { questionOne, questionTwo } = this.state

        dispatch(addQuestion(
            questionOne,
            questionTwo
        ))

        this.setState(() => ({
            questionOne: '',
            questionTwo: '',
            toDashboard: !!(questionOne && questionTwo),
        }))
    }

    render(){
        const { questionOne, questionTwo, toDashboard } = this.state;

        if (toDashboard === true) {
            return <Redirect exact to='/' />
        }

        return (
            <div className='center'>
                <h1>New Question:</h1>
                <div>Would You Rather...?</div>
          		<br></br>
                <form onSubmit={this.handleSendAnswer}>
                    <div>Option 1: <input value={questionOne} onChange={this.handleQuestionOneChange}/></div>
      				<br></br>
                    <div>Option 2: <input value={questionTwo} onChange={this.handleQuestionTwoChange}/></div>
      				<br></br>
                    <button disabled={questionOne === '' || questionTwo === ''}> Submit </button>
                </form>
            </div>

        );
    
    }
}


export default connect()(AddQuestion)