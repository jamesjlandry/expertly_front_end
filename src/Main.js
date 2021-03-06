import React from 'react';
import FieldsContainer from './containers/FieldsContainer'
import QuestionsContainer from './containers/QuestionsContainer'
import ProfileBox from './containers/ProfileBox'
import NewUser from './components/NewUser'
import CredentialsForm from './components/CredentialsForm'
import Header from './containers/Header'

export default class Main extends React.Component {
    
    constructor() {
        super()
        this.state = {
          questions: [],
          filteredQuestions: [],
          answers:[],
          users: [],
          fields: [],
         
          currentUser: {},
          loggedIn: false, 
          
          
          credentialFieldId: 1
        }
    }

    componentDidMount() {
        this.getFields();
        this.getUsers();
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
           this.setState({ currentUser: user, loggedIn: true})
           
        })
    }

 

    handleCredentials = (field_id) => {
        this.setState({credentialFieldId: field_id})
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
    .then(questions => this.setState({questions, filteredQuestions: questions}))
    }

    getAnswers = () => {
        fetch('http://localhost:3000/answers', {
            credentials: 'include'
        })
    .then(res => res.json())
    .then(answers => this.setState({answers}))
    }

    getUsers = () => {
        fetch('http://localhost:3000/users', {
            credentials: 'include'
        })
    .then(res => res.json())
    .then(users => this.setState({users}))
    }

    getCredentials = () => {
        fetch('http://localhost:3000/credentials', {
            credentials: 'include'
        })
    .then(res => res.json())
    .then(credentials => this.setState({credentials}))
    }

    // getUsers = () => {
    //     fetch('http://localhost:3000/users', {
    //         credentials: 'include'
    //     })
    // .then(res => res.json())
    // .then(users => this.setState({users}))
    // }


  

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
        console.log(currentUser)
        if (currentUser.username === user.username) {
        this.setState({
            currentUser,
            loggedIn: true
        })
    } else{
        alert("username or password incorrect")
    }
    }

    handleLogout = async () => {
        let response = await fetch('http://localhost:3000/log_out', {
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

 

    createQuestion = async (question) => {
        let response = await fetch('http://localhost:3000/questions', {
            credentials: 'include',
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({question: question})
        })
        let newQuestion = await response.json()
        this.setState({
            questions: [newQuestion, ...this.state.questions]
        })
       
    }

    createAnswer = async (answer) => {
        let response = await fetch('http://localhost:3000/answers', {
            credentials: 'include',
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({answer: answer})
        })
        let newAnswer = await response.json()
        if(newAnswer.message) {
            alert('you must be an expert in this field to answer')
        }
        this.setState({
            answers: [newAnswer, ...this.state.answers]
        })
       
    }

    createExpert = (credentials) => {
        fetch('http://localhost:3000/credentials', {
            credentials: 'include',
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({credentials, user_id: this.state.currentUser.id})
        })
        .then(res => res.json())
        .then(currentUser => {
            this.setState({currentUser})
        })
        this.handleCredentials()
    }

    filterField = (field_id) => {
        let  filteredQuestions = this.state.questions.filter(question => question.field_id === field_id)
        this.setState({filteredQuestions})
    }

    unfilterField = () => {
        this.setState({
            filteredQuestions: this.state.questions
        })
    }

    render () {

        let actualFields = this.state.fields.filter(field => field.id !== 1)
        return (
            <div>
                < Header />
                <ProfileBox
                    userLoggedIn={this.state.loggedIn}
                    handleLogout={this.handleLogout}
                    currentUser={this.state.currentUser}
                    showModal={this.showModal}
                    createUser={this.createUser}
                    userLogin={this.userLogin}
                    handleCredentials={this.handleCredentials}
                    createExpert={this.createExpert}
                />
                <FieldsContainer
                    fields={actualFields}
                    unfilterField={this.unfilterField}
                    filterField={this.filterField}
                    currentUser={this.state.currentUser}
                /> 
                <QuestionsContainer 
                    users={this.state.users}
                    answers={this.state.answers}
                    currentUser={this.state.currentUser}
                    questions={this.state.filteredQuestions}
                    createQuestion={this.createQuestion}
                    createAnswer={this.createAnswer}
                />
              
              
            </div>
        )
    }

}