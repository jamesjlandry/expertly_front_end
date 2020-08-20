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
          
          search: '',
          currentUser: {},
          loggedIn: false, 
          modal: false,
          credentialModal: false
        }
    }

    componentDidMount() {
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

    userLogin = async (user) => {
        let response = await fetch('http://localhost:3000/login', {
            'credentials': 'include',
            method: "POST",
            headers: {
               accept: 'application/json',
               'content-type': 'application/json' 
            },
            body: JSON.stringify(user)
        })
        let currentUser = await response.json()
        this.setState({
            currentUser,
            loggedIn: true
        })
    }

    handleLogout = async () => {
        let response = await fetch('http://localhost:3000/logout', {
            credentials: 'include',
            method: 'DELETE'
        })
        let loggedOut = await response.json()
        console.log(loggedOut)
        this.setState({
            currentUser: {},
            loggedIn: false 
        })
    }

    handleSearch = (e)=> {
        this.setState({search: e.target.value.toLowerCase()})
    }

    createQuestion = async (question) => {
        let response = await fetch('http://localhost:3000/questions', {
            credentials: 'include',
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(question)
        })
    }

    filterField = (fieldType) => {
        let  filteredQuestions = this.state.questions.filter(question => question.field_id === fieldType.id)
        this.setState({filteredQuestions})
    }

    render () {

        let actualFields = this.state.fields.filter(field => field.id !== 1)

        return (
            <div>
                < ProfileBox userLoggedIn={this.state.loggedIn} handleLogout={this.handleLogout} username={this.state.currentUser} showModal={this.showModal} createUser={this.createUser} userLogin={this.userLogin}/>
                < Search handleSearch={this.handleSearch}/> 
                < FieldsContainer fields={actualFields} filterField={this.filterField}/> 
                < QuestionsContainer currentUser={this.state.currentUser} questions={this.state.filteredQuestions} createQuestion={this.createQuestion}/>
                {this.state.modal ? < NewUser createUser={this.createUser} handleCredentials={this.handleCredentials}/> : null }
                {this.state.credentialsModal ? < CredentialsForm createExpert={this.createExpert} /> : null }
            </div>
        )
    }

}