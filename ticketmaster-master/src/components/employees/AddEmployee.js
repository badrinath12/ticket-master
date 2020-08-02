import React from 'react'
import { connect } from 'react-redux'
import {AddEmployee} from '../../actions/EmplyeesAction'
import {GetDepartment} from '../../actions/DepartmentAction'

 class AddEmployeeInfo extends React.Component {
     constructor(){
         super()
         this.state = {
             name :'',
             email:'',
             phno:'',
             dept:''
         }
     }

    componentDidMount = () =>{
        this.props.dispatch(GetDepartment())
    }
     handleTextChange =(e) =>{         
         this.setState( { [e.target.name]  : e.target.value})
     }

     handleSubmit = () =>{
        if(this.state.name !== '' && this.state.email !=='' && this.state.phno !=='' &&  this.state.dept !== ''){
            const employeeData = {
                name: this.state.name,
                email:this.state.email,
                mobile:this.state.phno,
                department:this.state.dept
            } 
 
            const redirect = () => this.props.history.push('/employees')
            this.props.dispatch(AddEmployee(employeeData,redirect ))
        } else {
            alert ('Please Provide valid data in all fileds!')
        }
     }

     render(){
          
         return(
             <div className = 'NewEmployee-section'>
                 
                 <h2> Add New Employee</h2>
                 <label  className = 'AddEmployee-label-name' htmlFor = 'name'>Name</label> <br/>
                <input  className = 'AddEmployee-name' type ='text' id= 'name' name ='name' value = {this.state.name}  onChange = {this.handleTextChange}/>
                 <br/>
                <label  className = 'AddEmployee-label-email' htmlFor = 'email'>Email</label> <br/>
                <input className = 'AddEmployee-email' type ='text' id= 'email' name ='email' value = {this.state.email} onChange = {this.handleTextChange}/>
                <br/>
                <label className = 'AddEmployee-label-phno' htmlFor = 'phno'>Mobile</label> <br/>
                <input  className = 'AddEmployee-phno' type ='text' id= 'phno' name ='phno' value = {this.state.phno} onChange = {this.handleTextChange}/> 
                <br/>
                <label className = 'AddEmployee-label-dept' htmlFor = 'dept'>Department</label> <br/>
                <select name = 'dept' className = 'AddEmployee-dept' onChange = {this.handleTextChange}>
                    <option>--Please Select--</option>
                    {
                        this.props.departments.map(dept =>{
                            return <option key = {dept._id} value = {dept._id} > {dept.name} </option>
                        })
                    }
                </select>
                <br/><br/>
                <button className = 'AddEmployee_button' onClick = {this.handleSubmit}> Submit </button>
             </div>
         )
     }
 }

 
 
const mapStateToProps = (state) => {
    return {
        departments:state.departments
    }
  }
  export default connect(mapStateToProps)(AddEmployeeInfo)
  