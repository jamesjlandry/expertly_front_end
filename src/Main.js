import React from 'react';
import FieldsContainer from './containers/FieldsContainer'
import QuestionsContainer from './containers/QuestionsContainer'
import Search from './components/Search'
import ProfileBox from './containers/ProfileBox'
import NewUser from './components/NewUser'
import CredentialsForm from './components/CredentialsForm'

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
          currentUser: {},
          loggedIn: false, 
          modal: false,
          credentialModal: false
        }
    }

    componentDidMount() {
        this.getUsers();
        this.getFields();
        this.getQuestions();
        this.getAnswers();
        this.getCredentials()
        this.loggedIn()
    }

    // // what strong params is looking for
    // // the request body *contains* the user
    // body = {
    //     user: {
    //         username: 'James'
    //     }
    // }
  

    // // what you're sending
    // // the request body *is* the user
    // body = {
    //     username: 'James'
    // }

    loggedIn = async () => {
        let response = await fetch('http://localhost:3000/logged_in', {
            'credentials': 'include'
        })
        let currentUser = await response.json()
        this.setState({
            currentUser,
            loggedIn: true
        })
    }

    createUser = (user) => {
        fetch('http://localhost:3000/users', {
            credentials: 'include',
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(user => {
           let users = [user, ...this.state.users]
           this.setState({users, currentUser: user, loggedIn: true})
           
        })
        
    }

 

    handleCredentials = (user) => {
        this.setState({credentialModal: !this.state.credentialModal, modal: !this.state.modal})
    }

    getFields = () => {
        fetch('http://localhost:3000/fields', {
            credentials: 'include'
        })
    .then(res => res.json())
    .then(fields => this.setState({fields}))
    }

    getQuestions = () => {
        fetch('http://localhost:3000/questions', {
            credentials: 'include'
        })
    .then(res => res.json())
    .then(questions => this.setState({questions}))
    }

    getAnswers = () => {
        fetch('http://localhost:3000/answers', {
            credentials: 'include'
        })
    .then(res => res.json())
    .then(answers => this.setState({answers}))
    }

    getCredentials = () => {
        fetch('http://localhost:3000/credentials', {
            credentials: 'include'
        })
    .then(res => res.json())
    .then(credentials => this.setState({credentials}))
    }

    getUsers = () => {
        fetch('http://localhost:3000/users', {
            credentials: 'include'
        })
    .then(res => res.json())
    .then(users => this.setState({users}))
    }


    showModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleLogin = () => {

    }

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
                < ProfileBox userLoggedIn={this.state.loggedIn} username={this.state.currentUser} showModal={this.showModal} createUser={this.createUser} handleLogin={this.handleLogin}/>
                < Search handleSearch={this.handleSearch}/> 
                < FieldsContainer fields={actualFields} filterField={this.filterField}/> 
                < QuestionsContainer questions={this.state.filteredQuestions}/>
                {this.state.modal ? < NewUser createUser={this.createUser} handleCredentials={this.handleCredentials}/> : null }
                {this.state.credentialsModal ? < CredentialsForm createExpert={this.createExpert} /> : null }
            </div>
        )
    }

}