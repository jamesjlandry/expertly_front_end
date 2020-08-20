import React from 'react'
import Question from '../components/Question'

export default class QuestionsContainer extends React.Component {


    render () {

        return (
            <div className="questionContainer">
                {this.props.questions.map(question => <Question key={question.id} question={question}/>)}
            </div>
        )
    }




}