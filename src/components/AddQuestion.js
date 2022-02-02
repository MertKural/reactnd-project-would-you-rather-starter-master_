import React from 'react'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleAddQuestion} from '../actions/questions'

class AddQuestion extends Component {
    state = {
        questionOne: '',
        questionTwo: '',
        toDashboard: false
    }

    handleQuestionOneChange = e => {
        const questionOne = e.target.value

        this.setState(() => ({
            questionOne
        }))
    }

    handleQuestionTwoChange = e => {
        const questionTwo = e.target.value

        this.setState(() => ({
            questionTwo
        }))
    }

    submitAnswer = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        const { questionOne, questionTwo } = this.state

        dispatch(handleAddQuestion(
            questionOne,
            questionTwo
        ))

        this.setState(() => ({
            questionOne: '',
            questionTwo: '',
            toDashboard: !!(questionOne && questionTwo),
        }))

    }


    render() {
        const { questionOne, questionTwo, toDashboard } = this.state;

        if (toDashboard === true) {
            return <Redirect exact to='/' />
        }

        return (
            <div className='center'>
                <h1>New Question:</h1>
                <h3>Would You Rather...?</h3>
          		<br></br>
                <form onSubmit={this.submitAnswer}>
                    <div>Option 1: <input value={questionOne} onChange={this.handleQuestionOneChange} placeholder='Enter option 1'/></div>
      				<br></br>
                    <div>Option 2: <input value={questionTwo} onChange={this.handleQuestionTwoChange} placeholder='Enter option 2'/></div>
      				<br></br>
                    <button disabled={questionOne === '' || questionTwo === ''}> Submit </button>
                </form>
            </div>

        );
    }
}


export default connect()(AddQuestion)