import React from 'react'


export default class Answer extends React.Component {


    render () {
        let user = this.props.user.filter(user => user.id === this.props.answer.user_id)
        return (
            <div>
               <div>{this.props.answer.text} {user}</div> 
            </div>
        )
    }




}