import React from 'react'


export default class Question extends React.Component {


    render () {

        return (
            <div>
                <div>{this.props.question.text}</div>
                <button>
                    Answer Question
                </button>
            </div>
        )
    }




}