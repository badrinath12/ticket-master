import React from 'react'
import {Redirect} from 'react-router-dom'
 
import { connect } from 'react-redux'
import {SetInitialToken,ResetInitialToken}  from '../actions/LoginAction'



class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            username:'',
            password:''
        }
    }

    handleText = (e) =>{ 
        this.setState( { [e.target.name] : e.target.value })
        this.props.dispatch(ResetInitialToken())
    }

    handleSubmit = (e) =>{         
        const loginFormData = {
            email: this.state.username,
            password:this.state.password
        }

        this.props.dispatch(SetInitialToken(loginFormData)) 

    }

    render(){
        return(
            <div className = 'Login-section'>
                
                <div className = 'Login-section-insideview'>
                <h2>Login Here !</h2>
                    <input className = 'Login-username' type = 'text' name = 'username' placeholder = 'Email' value = {this.state.username} onChange = {this.handleText} /> <br/>
                    <input  className = 'Login-pwd' type = 'password' name = 'password' placeholder = 'Password' value = {this.state.password} onChange = {this.handleText} /> <br/> 
                    <button className = 'LoginButton' onClick = {this.handleSubmit}> Login </button>
                    <ValidateLogin ResponseData = {this.props.token} />
                </div>
            </div>
        )
    }
}


function ValidateLogin (props) { 
    if(props.ResponseData.hasOwnProperty('error')) { 
          alert('Invalid Email/Password.')
          localStorage.removeItem('auth')
          return ''
    } else if( props.ResponseData.hasOwnProperty('token')) {
        console.log('redirect to login',props.ResponseData.token)
        // localStorage.setItem('auth',props.ResponseData.token)
        console.log('Localstore', localStorage.getItem('auth'))
        return <Redirect to ='/Home' />
    } else {        
        return ''
    }

}

const mapStateToProps = (state) => {
    return {
        token: state.token 
    }
}
export default connect(mapStateToProps)(Login)
 