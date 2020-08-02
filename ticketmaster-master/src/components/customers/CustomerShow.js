import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {GetEmployees} from '../../actions/EmplyeesAction'
import {GetTickets} from '../../actions/TicketAction'
import {GetCustomers} from '../../actions/CustomersAction'
import {GetDepartment} from '../../actions/DepartmentAction'

class ShowCustomer extends React.Component {
    constructor(){
        super()
        this.state = {
            customer : {},
            tickets :[]
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
                let customer =  this.props.Customers.find( cust => {           
                    return  cust._id === this.props.match.params.id
                 }) 

                 const tickets = this.props.Tickets.filter(tkt => {
                     return customer._id === tkt.customer
                 })
                //  console.log(customer,'data filters')
                 this.setState({customer ,tickets}) 
            }  
            } , 1000 ) 
    }
 

    handleTicketFilter  =(e) =>{
        const status = e.target.name
        let   tickets = []
        if(status === 'Pending'){
              tickets = this.props.Tickets.filter(tkt => {
                return this.state.customer._id === tkt.customer  && tkt.isResolved  === false
            })
        } else if (status === 'Complete') {
              tickets = this.props.Tickets.filter(tkt => {
                return this.state.customer._id === tkt.customer  && tkt.isResolved  === true
            })
        } else {
              tickets = this.props.Tickets.filter(tkt => {
                return this.state.customer._id === tkt.customer
            })
        } 

        this.setState({ tickets}) 
    }


    render(){
        console.log( this.state.customer.length)
        return(
            <div className = 'Show-customer-section'>
                <h2> {this.state.customer.name} -  {this.state.customer.email} </h2>
                <Link to = {`/customer/edit/${this.state.customer._id}`}> 
                    <button className = 'Editcustomer_Button' >Edit customer</button></Link>
                <br/> 
                <h2> Ticket details: </h2>
                <Link to = {`/customer/${this.state.customer._id}`}> 
                    <button className = 'Ticket-Show-all-button' name = 'All' onClick = {this.handleTicketFilter} >All</button></Link> 
                <Link to = {`/customer/${this.state.customer._id}`}> 
                    <button className = 'Ticket-Show-pending-button' name = 'Pending' onClick = {this.handleTicketFilter}>Pending</button></Link> 
                <Link to = {`/customer/${this.state.customer._id}`}> 
                    <button className = 'Ticket-Show-complete-button' name = 'Complete' onClick = {this.handleTicketFilter} >Completed</button></Link> 

                <h2> Tickets - {this.state.tickets.length} </h2>
                <div className = 'show-Ticket-customer-section'>
                {   
                     this.state.tickets.length && this.props.Employees.length && this.props.departments.length && this.state.customer  ?
                        <div>
                              
                            { 
                               this.state.tickets.map(ticket => { 
                                    const depart = this.props.departments.find( dept => dept._id === ticket.department)                            
                                    const tkemployee = ticket.employees.map(ticketemp => {
                                            const employee = this.props.Employees.find( emp => emp._id === ticketemp._id)                                            
                                            return employee.name
                                        }) 

                                    return(
                                      <Link to ={`/ticket/${ticket._id}`}>
                                        <div key = {ticket._id} className = 'showAll-Ticket-cutomer-section'  >
                                            <label className = 'showTicket-customer-label' > Customer - {this.state.customer.name}  </label>
                                            <br/>
                                            <label className = 'showTicket-employeelabel' > Employees - {
                                                  tkemployee.map((emp,i) =>{
                                                    return i+1 === tkemployee.length ? emp : `${emp},`
                                                  })
                                                 }
                                            </label>
                                            <br/>
                                            <label className = 'showTicket-department-label' > Department - {depart.name} </label>
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
                       
                    : <h4> No Records Found... </h4>

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
        departments:state.departments
    }
  }
  export default connect(mapStateToProps)(ShowCustomer)
  