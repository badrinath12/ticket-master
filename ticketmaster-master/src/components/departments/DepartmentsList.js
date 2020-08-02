import React from 'react'
// import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {GetDepartment,AddDepartment,RemoveDepartment} from '../../actions/DepartmentAction'

class DepartmentsList extends React.Component {     
    constructor(){
        super()
        this.state = {
            departname:''
        }
    } 

    componentDidMount = () =>{         
        this.props.dispatch(GetDepartment())
                
    }

    handleRemoveDepartment = (id) =>{       
        this.props.dispatch(RemoveDepartment(id))
    }
    
    hadleRedirect = (path) =>{
        this.props.history.push(path)
    }

    handleTextChange = (e) =>{
        this.setState( { [e.target.name] : e.target.value})
    }

    handleDepartment = () =>{
        if(this.state.departname){
           const res = this.props.departments.filter(dept => dept.name === this.state.departname)
           
           if(res.length > 0){
                alert (`Department - ${this.state.departname} already exists!`)
                this.setState({departname:''})
           } else {
                const department = { name:this.state.departname}
                this.props.dispatch(AddDepartment(department))
                this.setState({departname:''})
           }
            
        } else {
            alert ('Please provide the Department Name !')
        }
    }
 

    render() {        
        return(
            <div className = "DepartmentsInfo">                
                <h2 className = 'department-list-header'> Departments - {this.props.departments.length} </h2>
                 <ul className = 'department-list-view'>
                     {
                         this.props.departments.map((depart,i )=>{
                            return  <li key ={i+1} className = 'department-list-inside-view'>
                                 {depart.name}
                                 <div className = 'departsection-list-button'>
                                    <button className = 'show-depatment-button' onClick ={ ()=> {
                                            this.hadleRedirect(`/departments/${depart._id}`)
                                    }} > Show </button>
                                    <button className = 'remove-depatment-button' onClick = {()=>{
                                        this.handleRemoveDepartment(depart._id)
                                    }}>Remove </button>
                                 </div>
                             </li>
                         })
                     }
                 </ul>
                <br/>
                <h2 className = 'depart-list-add-header'> Add Department</h2>
                <input className = 'new-department-text' type = 'text' id= 'newdpart' name = 'departname' 
                    value = {this.state.departname} placeholder = 'Name' onChange = {this.handleTextChange} />
                <br/>
                <button className = 'add-department-button' onClick = {this.handleDepartment} > ADD </button>

            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        departments: state.departments         
    }
}
export default connect(mapStateToProps)(DepartmentsList)
 