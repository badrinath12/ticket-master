import React from 'react' 
import {connect} from 'react-redux'
import { EditDepartment} from '../../actions/DepartmentAction'

class EditDepartmentInfo extends React.Component {     
    constructor(){
        super()
        this.state = {
            departname:''
        }
    } 

    componentDidMount = () =>{    
        if(this.props.departments){
            this.setState({departname:this.props.departments.name})
        } 
        else {
            const redirect = () => this.props.history.push('/departments')
            redirect() 
        }
           
                
    }
  
    handleTextChange = (e) =>{
        this.setState( { [e.target.name] : e.target.value})
    }

    handleDepartment = () =>{
        if(this.state.departname){
            const department = { name:this.state.departname}
            const redirect = () => this.props.history.push('/departments')
            this.props.dispatch(EditDepartment(department,this.props.departments._id,redirect))
            
        } else {
            alert ('Please provide the Department Name !')
        }
    }

    render() {        
        return(
            <div className = "DepartmentsInfo"> 
                <h2> Edit Department</h2>
                <input className = 'edit-department-text' type = 'text' id= 'newdpart' name = 'departname' 
                    value = {this.state.departname} placeholder = 'Name' onChange = {this.handleTextChange} />
                <br/>
                <button className = 'add-editted-department-button' onClick = {this.handleDepartment} > Submit </button>

            </div>
        )
    }
}



const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        departments: state.departments.find(dept => dept._id === id)       
    }
}
export default connect(mapStateToProps)(EditDepartmentInfo)
 