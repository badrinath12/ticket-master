import React from 'react'
import { connect } from 'react-redux'
import {AddCustomers} from '../../actions/CustomersAction'


 class AddCustomer extends React.Component {
     constructor(){
         super()
         this.state = {
             name :'',
             email:'',
             phno:''

         }
     }

     
     handleTextChange =(e) =>{
         this.setState( { [e.target.name]  : e.target.value})
     }

     handleSubmit = () =>{
        if(this.state.name !== '' && this.state.email !=='' && this.state.phno !==''){
            const customerData = {
                name: this.state.name,
                email:this.state.email,
                mobile:this.state.phno
            } 
            const redirect = () => this.props.history.push('/customers')
            this.props.dispatch(AddCustomers(customerData,localStorage.getItem('auth'),redirect ))
        } else {
            alert ('Please Provide valid data in all fileds!')
        }
     }

     render(){
         console.log('Token',localStorage.getItem('auth'))
         return(
             <div className = 'NewCustomer-section'>
                 
                 <h2> Add New Customer</h2>
                 <label  className = 'AddCustomer-label-name' htmlFor = 'name'>Name</label> <br/>
                <input  className = 'AddCustomer-name' type ='text' id= 'name' name ='name' value = {this.state.name}  onChange = {this.handleTextChange}/>
                 <br/>
                <label  className = 'AddCustomer-label-email' htmlFor = 'email'>Email</label> <br/>
                <input className = 'AddCustomer-email' type ='text' id= 'email' name ='email' value = {this.state.email} onChange = {this.handleTextChange}/>
                <br/>
                <label className = 'AddCustomer-label-phno' htmlFor = 'phno'>Mobile</label> <br/>
                <input  className = 'AddCustomer-phno' type ='text' id= 'phno' name ='phno' value = {this.state.phno} onChange = {this.handleTextChange}/> 
                <br/>
                <button className = 'AddCustomer_button' onClick = {this.handleSubmit}> Submit </button>
             </div>
         )
     }
 }

 
 
const mapStateToProps = (state) => {
    return {
        token: state.token 
    }
  }
  export default connect(mapStateToProps)(AddCustomer)
  