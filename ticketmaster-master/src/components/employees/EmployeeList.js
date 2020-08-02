import React from 'react' 
import {connect} from 'react-redux'
import {GetEmployees,RemoveEmployee} from '../../actions/EmplyeesAction'

class EmployeesList extends React.Component {     
     
    componentDidMount = () =>{         
        this.props.dispatch(GetEmployees()) 
    }

    handleRemoveEmployee = (id) =>{       
        this.props.dispatch(RemoveEmployee(id))
    }
    
    hadleRedirect = (path) =>{
        this.props.history.push(path)
    }

    render() {        
        return(
            <div className = "employeesInfo">                
                <h2> Employees - {this.props.Employees.length} </h2>
                <button className = 'Add-new-Employee_Button' onClick = {()=>{
                    this.hadleRedirect('/employee/new')
                }}> Add Employee</button> 
                <br/>
                <br/>
                <table border = '1' className='table-employee-info' style = {{align:'center'}}>
                    <thead>
                        <tr>
                            <th>ID#</th>
                            <th>Name</th>
                            <th> Email</th>
                            <th>Mobile</th>
                            <th>Department</th>
                            <th>Actions</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            this.props.Employees.map( (emp,i)=>{ 
                               return ( <tr key ={i}>
                                    <td>{i+1}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.mobile}</td>
                                    <td>{emp.department.name}</td>
                                    <td> 
                                    <button className = 'employee-Ticketinfo_Button' onClick ={()=>{
                                        this.hadleRedirect( `/employees/${emp._id}`)
                                    }}> Show</button>  </td>
                                    <td> 
                                        <button className = 'employee-remove_Button'
                                         onClick = {() =>{this.handleRemoveEmployee(emp._id)}}> Remove</button></td>
                                    
                                </tr>)                            
                            })
                        }
                    </tbody>
                </table>
                <br/> 
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        Employees: state.Employees      
    }
}
export default connect(mapStateToProps)(EmployeesList)
 