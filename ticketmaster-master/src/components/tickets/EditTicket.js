import React from 'react'
import { connect } from 'react-redux' 
import {GetEmployees} from '../../actions/EmplyeesAction' 
import {GetCustomers} from '../../actions/CustomersAction'
import {GetDepartment} from '../../actions/DepartmentAction'
import Select from 'react-select'
import {GetTickets,EditTicket} from '../../actions/TicketAction'

 class EditTicketInfo extends React.Component {
     constructor(){
         super()
         this.state = {
             code :'',
             customer:'',
             department:'',
             employeenew:[],
             employee: [],
             messgae : '',
             priority:'',
             complete:false,
             DataFetched:false,
             ticket :[]
         }
     }

    componentDidMount = () =>{
        this.props.dispatch(GetEmployees())        
        this.props.dispatch(GetCustomers(localStorage.getItem('auth'))) 
        this.props.dispatch(GetDepartment())         
        this.props.dispatch(GetTickets()) 

        const refersh =  setInterval( () =>{            
            if (this.props.Employees.length && this.props.Tickets.length  && this.props.departments.length && this.props.Customers.length) {                
                this.setState({
                    ticket : this.props.Tickets.find(tkt => tkt._id === this.props.match.params.id) 
                  })               
                this.setState({DataFetched:true , 
                    messgae :this.state.ticket.message , 
                    priority :this.state.ticket.priority,
                    code:this.state.ticket.code,
                    customer:this.state.ticket.customer,
                    department : this.state.ticket.department
                })
                this.handleEmployee ('department',this.state.ticket.department)
                clearInterval(refersh)
            }  
        } , 1000 ) 
    }
     handleTextChange =(e) =>{         
         this.setState( { [e.target.name]  : e.target.value}) 
         this.handleEmployee (e.target.name,e.target.value)
     }

     handleEmployee = (type,value) =>{
        if(type === 'department') { 
            let employeenew = [] 
            this.props.Employees.forEach( emp => {  
                if( emp.department._id === value ){ 
                    employeenew =  employeenew.concat( [{ id:emp._id,value:emp._id,label:emp.name,deptID:value}] )
                   
                }
                 
            }) 
        this.setState({employeenew}) 
    } 
     }

     handleMultiChange = (option) => { 
        if(option !== null){
            const employee = option.map(option =>  { 
                return  { _id:option.id }
            })

            this.setState({employee}) 
        }
    }
      
     handleSubmit = () =>{
        if(this.state.code !== '' && this.state.customer !=='' && this.state.department !=='' && 
             this.state.employee !== [] && this.state.messgae !=='' && this.state.priority !=='' ){
            const ticketData = {
                code: this.state.code,
                customer:this.state.customer,
                department:this.state.department,
                employees:this.state.employee,
                priority: this.state.priority,
                message:this.state.messgae
            } 
            console.log(ticketData)
            const redirect = () => this.props.history.push('/tickets')
            this.props.dispatch(EditTicket(ticketData,this.state.ticket._id,redirect ))
        } else {

           console.log(this.state.code ,this.state.customer ,this.state.department ,  this.state.employee ,  this.state.messgae 
            , this.state.priority  )  
            alert ('Please Provide valid data in all fileds!')
        }
     }


     render(){
      
         return(
             <div className = 'New-Ticket-section'>                 
                 <h2> Edit Ticket</h2>
                 <label  className = 'AddTicket-label-code' htmlFor = 'code'>Code</label> <br/>
                <input  className = 'AddTicket-code' type ='text' id= 'code' name ='code' 
                    value = {this.state.code}  onChange = {this.handleTextChange}/>
                 <br/>
                <label  className = 'AddTicket-label-customer' htmlFor = 'customer'>Customer</label> <br/>
                <select id = 'customer' name = 'customer' className = 'AddTicket-customer' onChange = {this.handleTextChange}>
                    <option>--Please Select--</option>
                    {
                        this.props.Customers.map(customer=>{
                            return <option key = {customer._id} value = {customer._id} 
                                selected = {this.state.ticket.customer === customer._id}
                            > {customer.name} </option>
                        })
                    }
                </select>                
                <br/>
                 
                <label className = 'AddTicket-label-dept' htmlFor = 'department'>Department</label> <br/>
                <select name = 'department' id ='department' className = 'AddEmployee-department' onChange = {this.handleTextChange}>
                    <option>--Please Select--</option>
                    {
                        this.props.departments.map(dept =>{
                            return <option key = {dept._id} value = {dept._id} 
                            selected = {this.state.ticket.department === dept._id}
                            > {dept.name} </option>
                        })
                    }
                </select>
                <br/>
                <label  className = 'AddTicket-label-employee' htmlFor = 'employee'>Employee</label> <br/> 
                <Select
                    name="employee"
                    id = 'employee'
                    className = 'AddTicket-select-employee'
                    placeholder="Select"
                    options={this.state.employeenew}
                    onChange={this.handleMultiChange}
                    isMulti
                />
                <br/>
                <label  className = 'AddTicket-label-message' htmlFor = 'message'>Message</label> <br/>
                <textarea className = 'AddTicket-message' name = 'messgae' id = 'messgae' value = {this.state.messgae} onChange={this.handleTextChange} />
                <br/>
                <label  className = 'AddTicket-label-priority' >Priority</label> <br/>
                <label htmlFor = 'High'>
                    <input type="radio" id='High' value="High" checked= {this.state.priority==="High"} onChange={this.handleTextChange} name="priority"/>{' '}
                    High
                </label>
                 <br/>
                 <label htmlFor = 'Medium'>
                    <input type="radio" id='Medium' value="Medium" checked= {this.state.priority==="Medium"} onChange={this.handleTextChange} name="priority"/>{' '}
                    Medium
                </label>
                <br/>
                <label htmlFor = 'Low'>
                    <input type="radio" id='Low' value="Low" checked= {this.state.priority==="Low"} onChange={this.handleTextChange} name="priority"/>{' '}
                    Low
                </label>
                <br/>  <br/> 
                <button className = 'AddEmployee_button' onClick = {this.handleSubmit}> Submit </button>
             </div>
         )
     }
 }

  
const mapStateToProps = (state) => {
     
    return {
        Tickets: state.Tickets,
        Employees: state.Employees, 
        departments:state.departments,
        Customers:state.Customers
         
        
    }
  }
  export default connect(mapStateToProps)(EditTicketInfo)
  