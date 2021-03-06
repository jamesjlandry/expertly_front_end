import React from 'react'
import Answer from '../components/Answer'

export default class AnswersContainer extends React.Component {


    render () {

        return (
            <div>
                {this.props.answers.map(answer => <Answer key={answer.id} answer={answer} users={this.props.users}/>)}
            </div>
        )
    }




}