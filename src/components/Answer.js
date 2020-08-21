import React from 'react'


export default class Answer extends React.Component {


    render () {
        let user = this.props.users.filter(user => user.id === this.props.answer.user_id)
        return (
            <div>
               <div className='answer'>{this.props.answer.text} {user.map(user => <div className= "answer_name">~ {user.username}</div>)}</div> 

            </div>
        )
    }




}