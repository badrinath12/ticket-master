import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {SetUserRegister} from '../actions/RegisterAction'

class Register extends React.Component {
    constructor(){
        super()
        this.state = {
            username:'',
            password:'',
            email:'',
            responseData : {}
             
        }
    }

    handleText = (e) =>{
        this.setState( { [e.target.name] : e.target.value })
    }

    handleSubmit = (e) =>{         
        const registerFormData = {
            username: this.state.username,
            email:this.state.email,
            password:this.state.password
        }

        this.props.dispatch(SetUserRegister(registerFormData))
          
        const refersh =  setInterval( () =>{   
            console.log(this.props.UserAccountInfo)             
            if (this.props.UserAccountInfo) {
                this.setState({responseData:this.props.UserAccountInfo})
                clearInterval(refersh)
            }
        } , 1000 ) 
    }

    render(){
        return(
            <div className = 'Register'>
                 
                <h2>Register Here !</h2>
                <input className = 'Register-username' type = 'text' name = 'username' placeholder = 'UserName' value = {this.state.username} onChange = {this.handleText} /> <br/>
                <input  className = 'Register-email'  type = 'text' name = 'email' placeholder = 'Email' value = {this.state.email} onChange = {this.handleText} /> <br/>
                
                <input className = 'Register-pwd'  type = 'password' name = 'password' placeholder = 'Password' value = {this.state.password} onChange = {this.handleText} /> <br/> 
                <button className = 'RegisterButton' onClick = {this.handleSubmit}> Register </button>
                {
                    this.state.responseData? <ValidateRegister ResponseData = {this.state.responseData} />  : ''
                }
                 
            </div>
        )
    }
}

function ValidateRegister (props) {
   
    if(props.ResponseData.hasOwnProperty('errors')) {
        console.log('error')
        return <h2> UserName is already available. Try again !! </h2>
    } else if( props.ResponseData.hasOwnProperty('username')) {
        console.log('redirect to login')
        
        return <Redirect to ='/Login' />
    } else {        
        return ''
    }

}


const mapStateToProps = (state) => {
    return {
        UserAccountInfo: state.UserAccountInfo 
    }
}
export default connect(mapStateToProps)(Register)
 
 