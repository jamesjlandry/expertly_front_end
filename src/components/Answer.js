import React from 'react'


export default class Answer extends React.Component {


    render () {

        return (
            <div>
               <div>{this.props.answer.text}</div> 
            </div>
        )
    }




}