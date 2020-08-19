import React from 'react';
import FieldsContainer from './containers/FieldsContainer'
import QuestionsContainer from './containers/QuestionsContainer'
import Search from './components/Search'
import ProfileBox from './containers/ProfileBox'

export default class Main extends React.Component {
    
    constructor() {
        super()
        this.state = {
          questions: [],
          filteredQuestions: [],
          answers:[],
          fields: [],
          users: [],
          search: '',
          currentUser: {}
        }
    }

    componentDidMount() {
        // this.getUsers();
        this.getFields();
        // this.getQuestions();
        // this.getAnswers();
        // this.getCredentials()
    }

    // getUsers = () => {
    //     fetch('http://localhost:3000/users')
    // .then(res => res.json())
    // .then(users => this.setState({users}))
    // }

    // createUser = (user) => {
    //     fetch('http://localhost:3000/users', {
    //         method: 'POST',
    //         headers: {
    //             accept: 'application/json',
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //     .then(res => res.json())
    //     .then(user => {
    //        let users = [user, ...this.state.users]
    //        this.setState({users, currentUser: user})
    //     })
    // }

    getFields = () => {
        fetch('http://localhost:3000/fields', {
            credentials: 'include'
        })
    .then(res => res.json())
    .then(fields => this.setState({fields}))
    }

    // getQuestions = () => {
    //     fetch('http://localhost:3000/questions')
    // .then(res => res.json())
    // .then(questions => this.setState({questions}))
    // }

    // getAnswers = () => {
    //     fetch('http://localhost:3000/answers')
    // .then(res => res.json())
    // .then(answers => this.setState({answers}))
    // }

    // getCredentials = () => {
    //     fetch('http://localhost:3000/credentials')
    // .then(res => res.json())
    // .then(credentials => this.setState({credentials}))
    // }


    handleSearch = (e)=> {
        this.setState({search: e.target.value.toLowerCase()})
    }

    filterField = (fieldType) => {
        let  filteredQuestions = this.state.questions.filter(question => question.field_id === fieldType.id)
        this.setState({filteredQuestions})
    }

    render () {

        let actualFields = this.state.fields.filter(field => field.id !== 1)

        return (
            <div>
                < Search handleSearch={this.handleSearch}/> 
                < FieldsContainer fields={actualFields} filterField={this.filterField}/> 
                < QuestionsContainer questions={this.state.filteredQuestions}/>
                < ProfileBox createUser={this.createUser}/>
            </div>
        )
    }




}