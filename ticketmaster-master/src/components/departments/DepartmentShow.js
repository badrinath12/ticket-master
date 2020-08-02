import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {GetEmployees} from '../../actions/EmplyeesAction'
import {GetTickets} from '../../actions/TicketAction'
import {GetCustomers} from '../../actions/CustomersAction'
import {GetDepartment} from '../../actions/DepartmentAction'

class ShowDepartment extends React.Component {
    constructor() {
        super()
        this.state ={
            deprtment : [],
            tickets : []
        }
    }

    componentDidMount = () =>{   
        
        this.props.dispatch(GetEmployees())
        this.props.dispatch(GetCustomers(localStorage.getItem('auth'))) 
        this.props.dispatch(GetDepartment())
        this.props.dispatch(GetTickets()) 
        console.log(this.props.match.params.id)
 
        const refersh =  setInterval( () =>{  
            if ( this.props.Tickets.length  && this.props.Employees.length && this.props.departments.length && this.props.Customers.length) { 
                
                clearInterval(refersh)
                let deprtment =  this.props.departments.find( dept => {           
                    return  dept._id === this.props.match.params.id
                 }) 

                 const tickets = this.props.Tickets.filter(tkt => {
                     return deprtment._id === tkt.department 
                 }) 

                 
                 this.setState({deprtment ,tickets}) 
            }  
        } , 2000 ) 
    }

    
    handleTicketFilter  =(e) =>{
        const status = e.target.name
        let   tickets = []
        if(status === 'Pending'){
              tickets = this.props.Tickets.filter(tkt => {
                return this.state.deprtment._id === tkt.department  && tkt.isResolved  === false
            })
        } else if (status === 'Complete') {
              tickets = this.props.Tickets.filter(tkt => {
                return this.state.deprtment._id === tkt.department  && tkt.isResolved  === true
            })
        } else {
              tickets = this.props.Tickets.filter(tkt => {
                return this.state.deprtment._id === tkt.department
            })
        } 

        this.setState({ tickets}) 
    }

        
    render(){  
        console.log(this.state.tickets.length , this.props.Employees.length , this.state.deprtment , this.props.Customers)       
        return(
            <div className = 'Show-customer-section'>
                <h2> Name - {this.state.deprtment.name} </h2>
                <Link to = {`/departments/edit/${this.state.deprtment._id}`}> 
                    <button className = 'Editdepartment_Button' >Edit Department</button></Link>
                <br/> 
                <h2> Ticket Information </h2>
                <Link to = {`/departments/${this.state.deprtment._id}`}> 
                    <button className = 'Ticket-Show-all-button' name = 'All' onClick = {this.handleTicketFilter}  >All</button></Link> 
                <Link to = {`/departments/${this.state.deprtment._id}`}> 
                    <button className = 'Ticket-Show-pending-button' name = 'Pending' onClick = {this.handleTicketFilter}  >Pending</button></Link> 
                <Link to ={`/departments/${this.state.deprtment._id}`}> 
                    <button className = 'Ticket-Show-complete-button' name = 'Complete' onClick = {this.handleTicketFilter}  >Completed</button></Link> 

                <h2> Tickets - {this.state.tickets.length} </h2>
                <div className = 'show-Ticket-customer-section'>
                {  
                     this.state.tickets.length && this.props.Employees.length && this.state.deprtment && this.props.Customers  ?
                        <div>
                            {
                                 
                                this.state.tickets.map((ticket,i) => { 
                                        const customerData = this.props.Customers.find( cust => cust._id === ticket.customer)                             
                                        const tkemployee = ticket.employees.map(ticketemp => {
                                                const employee = this.props.Employees.find( emp => emp._id === ticketemp._id)                                            
                                                return employee.name
                                            }) 

                                        return(
                                        <Link to ={`/ticket/${ticket._id}`} key = {i} >
                                            <div className = 'showAll-Ticket-cutomer-section'  >
                                                <label className = 'showTicket-customer-label' > Customer - {customerData.name}  </label>
                                                <br/>
                                                <label className = 'showTicket-employeelabel' > Employees - {
                                                    tkemployee.map((emp,i) =>{
                                                        return i+1 === tkemployee.length ? emp : `${emp},`
                                                    })
                                                    }
                                                </label>
                                                <br/>
                                                <label className = 'showTicket-department-label' > Department - {this.state.deprtment.name} </label>
                                                <br/>
                                                <label className = 'showTicket-message-label' > Message - {ticket.message} </label>
                                                <br/>
                                                <label className = 'showTicket-priority-label'> Priority - {ticket.priority} </label>
                                            </div>
                                        </Link>
                                        )
                                }) 
                        
                             
                            } 
                        </div>
                       
                    : <h4> No Records Found </h4>

                }
            </div> 

            </div>
        )
    }
}


const mapStateToProps = (state,props) => {
    const id = props.match.params.id     
    return {
        Customers: state.Customers,
        Employees: state.Employees,
        Tickets:state.Tickets,
        departments: state.departments 
    }
  }
  export default connect(mapStateToProps)(ShowDepartment)
  