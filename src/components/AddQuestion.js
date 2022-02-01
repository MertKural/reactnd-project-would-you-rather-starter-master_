import React from 'react'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleQuestionAdd} from '../actions/questions'

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
        const {dispatch} = this.props
        const {questionOne, questionTwo} = this.state
        dispatch(handleQuestionAdd(questionOne, questionTwo))
        this.setState(() => ({
            questionOne:'',
            questionTwo: '',
            toDashboard: !!(questionOne && questionTwo)
        }))
    }

    render(){

        if(this.state.toDashboard === true){
            return <Redirect exact to='/'/>
        }

        return(
            <div className='center'>
                <h1>New Question</h1>
                <div>Would You Rather ???</div>
                <form onSubmit={this.handleSendAnswer}>
                    <div>Option1: <input value={this.state.questionOne} onChange={this.handleQuestionOneChange} /></div>
                    <div>Option2: <input value={this.state.questionTwo} onChange={this.handleQuestionTwoChange} /></div>
                    <button disabled = {this.state.questionOne === '' || this.state.questionTwo === ''}>Submit</button>
                </form>
            </div>
        )
    }
}


export default connect()(AddQuestion)