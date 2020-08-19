import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
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
          search: ''
        }
    }

    componentDidMount() {
        this.getUsers();
        this.getFields();
        this.getQuestions();
        this.getAnswers();
        this.getCredentials()
    }

    getUsers = () => {
        fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => this.setState({users}))
    }

   

    getFields = () => {
        fetch('http://localhost:3000/fields')
    .then(res => res.json())
    .then(fields => this.setState({fields}))
    }

    getQuestions = () => {
        fetch('http://localhost:3000/questions')
    .then(res => res.json())
    .then(questions => this.setState({questions}))
    }

    getAnswers = () => {
        fetch('http://localhost:3000/answers')
    .then(res => res.json())
    .then(answers => this.setState({answers}))
    }

    getCredentials = () => {
        fetch('http://localhost:3000/credentials')
    .then(res => res.json())
    .then(credentials => this.setState({credentials}))
    }

     handleClick = () => {
        axios.delete('http://localhost:3000/logout', {withCredentials: true})
        .then(response => {
          this.props.handleLogout()
          this.props.history.push('/')
        })
        .catch(error => console.log(error))
      }

    handleLogin = (data) => {
        this.setState({
          isLoggedIn: true,
          currentUser: data.currentUser
        })
      }

    handleLogout = () => {
        this.setState({
        isLoggedIn: false,
        currentUser: {}
        })
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
                <Link to='/login'>Log In</Link>
                    <br></br>
                <Link to='/signup'>Sign Up</Link>
                <br></br>
                { 
                    this.props.loggedInStatus ? 
                    <Link to='/logout' onClick={this.handleClick}>Log Out</Link> : 
                    null
                 }
                < Search handleSearch={this.handleSearch}/> 
                < FieldsContainer fields={actualFields} filterField={this.filterField}/> 
                < QuestionsContainer questions={this.state.filteredQuestions}/>
                < ProfileBox createUser={this.createUser}/>
            </div>
        )
    }




}