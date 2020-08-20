import React from 'react'


export default class Question extends React.Component {


    render () {

        return (
            <div className="questionBox">
                <div>{this.props.question.text}</div>
                <button className='answer_button'>
                    Answer Question
                </button>
            </div>
        )
    }




}