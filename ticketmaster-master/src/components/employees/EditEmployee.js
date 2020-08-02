import React from 'react'
import { connect } from 'react-redux'
import {EditCustomers} from '../../actions/EmplyeesAction'
import {GetDepartment} from '../../actions/DepartmentAction'

 class EditEmployee extends React.Component {
     constructor(){        
         super()
         this.state = {
             name : '',
             email:'',
             phno:'',
             dept:''
         }
     }

     
    componentDidMount = () =>{  
        this.props.dispatch(GetDepartment())
        if(this.props.Employees){              
            this.setState({ name: this.props.Employees.name,
                email:this.props.Employees.email,
                phno:this.props.Employees.mobile                
             })
        } 
        else {
            const redirect = () => this.props.history.push('/employees')
            redirect() 
        }      
    }

     handleTextChange =(e) =>{
         this.setState( { [e.target.name]  : e.target.value})
     }

     handleSubmit = () =>{
        if(this.state.name !== '' && this.state.email !=='' && this.state.phno !==''){
            const employeeData = {
                name: this.state.name,
                email:this.state.email,
                mobile:this.state.phno,
                department:this.state.dept
            } 
            
            console.log(employeeData)
            const redirect = () => this.props.history.push('/employees')
            this.props.dispatch(EditCustomers(employeeData,this.props.Employees._id,redirect ))
        } else {
            alert ('Please Provide valid data in all fileds!')
        }
     }

      

     render(){       
        return(
            <div className = 'EditEmployee-section'>
                
                <h2> Edit Employee info</h2>
                <label  className = 'EditEmployee-label-name' htmlFor = 'name'>Name</label> <br/>
               <input  className = 'EditEmployee-name' type ='text' id= 'name' name ='name' value = {this.state.name}  onChange = {this.handleTextChange}/>
                <br/>
               <label  className = 'EditEmployee-label-email' htmlFor = 'email'>Email</label> <br/>
               <input className = 'EditEmployee-email' type ='text' id= 'email' name ='email' value = {this.state.email} onChange = {this.handleTextChange}/>
               <br/>
               <label className = 'EditEmployee-label-phno' htmlFor = 'phno'>Mobile</label> <br/>
               <input  className = 'EditEmployee-phno' type ='text' id= 'phno' name ='phno' value = {this.state.phno} onChange = {this.handleTextChange}/> 
               <br/>
               <label className = 'EditEmployee-label-dept' htmlFor = 'dept'>Department</label> <br/>
               <select name = 'dept' className = 'EditEmployee-dept' onChange = {this.handleTextChange}>
                   <option>--Please Select--</option>
                   {
                       this.props.departments.map(dept =>{
                           return <option key = {dept._id} value = {dept._id} > {dept.name} </option>
                       })
                   }
               </select>
               <br/><br/>
               <button className = 'EditEmployee_button' onClick = {this.handleSubmit}> Submit </button>
            </div>
        )
    }
 }

 
 
const mapStateToProps = (state,props) => {
    const id = props.match.params.id     
    return {
        Employees: state.Employees.find( emp => {           
           return  emp._id === id
        }) ,
        departments:state.departments
    }

  }
  export default connect(mapStateToProps)(EditEmployee)
  