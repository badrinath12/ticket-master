import React from 'react'
import { connect } from 'react-redux'
import {EditCustomers} from '../../actions/CustomersAction'

 class Editustomer extends React.Component {
     constructor(){        
         super()
         this.state = {
             name : '',
             email:'',
             phno:''

         }
     }

     
    componentDidMount = () =>{    
        if(this.props.Customers){              
        this.setState({ name: this.props.Customers.name,
            email:this.props.Customers.email,
            phno:this.props.Customers.mobile })
            
        } 
        else {
            const redirect = () => this.props.history.push('/customers')
            redirect() 
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

            console.log(customerData)
            const redirect = () => this.props.history.push('/customers')
            this.props.dispatch(EditCustomers(customerData,this.props.Customers._id,redirect ))
        } else {
            alert ('Please Provide valid data in all fileds!')
        }
     }

      

     render(){       
         return(
             <div className = 'Edit-Customer-section'>
                 
                 <h2> Edit Customer Details</h2>
                 <label  className = 'EditCustomer-label-name' htmlFor = 'name'>Name</label> <br/>
                <input  className = 'EditCustomer-name' type ='text' id= 'name' name ='name' value = {this.state.name}  onChange = {this.handleTextChange}/>
                 <br/>
                <label  className = 'EditCustomer-label-email' htmlFor = 'email'>Email</label> <br/>
                <input className = 'EditCustomer-email' type ='text' id= 'email' name ='email' value = {this.state.email} onChange = {this.handleTextChange}/>
                <br/>
                <label className = 'EditCustomer-label-phno' htmlFor = 'phno'>Mobile</label> <br/>
                <input  className = 'EditCustomer-phno' type ='text' id= 'phno' name ='phno' value = {this.state.phno} onChange = {this.handleTextChange}/> 
                <br/>
                <button className = 'Submit-Edit-Customer_button' onClick = {this.handleSubmit}> Submit </button>
             </div>
         )
     }
 }

 
 
const mapStateToProps = (state,props) => {
    const id = props.match.params.id     
    return {
        Customers: state.Customers.find( cust => {           
           return  cust._id === id
        }) 
    }
  }
  export default connect(mapStateToProps)(Editustomer)
  