import React from 'react'
import {GetSingleTicket} from '../../actions/TicketAction'
import {GetCustomers} from '../../actions/CustomersAction'
import {GetDepartment} from '../../actions/DepartmentAction'
import {GetEmployees} from '../../actions/EmplyeesAction'
import {connect} from 'react-redux'
 
class ShowTicket extends React.Component {
    constructor() {
        super()
        this.state = {
            DataFetched : false
        }
    }

    componentDidMount = () => {         
        if(this.props.match.params.id) {
            this.props.dispatch(GetSingleTicket(this.props.match.params.id))
            this.props.dispatch(GetEmployees())
            this.props.dispatch(GetCustomers(localStorage.getItem('auth'))) 
            this.props.dispatch(GetDepartment())
            
            const refersh =  setInterval( () =>{  
                if ( this.props.Tickets.length && this.props.Employees.length && this.props.departments.length && this.props.Customers.length ) { 
                    clearInterval(refersh)
                    this.setState({DataFetched:true }) 
                }  
            } , 2000 ) 
        } else {
            const redirect = () => this.props.history.push('/tickets')
            redirect()
        } 
    }

    hadleRedirect = (path) =>{
        this.props.history.push(path)
    } 

    render() {
         
        return (
            <div className = 'ShowTicket-section'>
                { this.props.Tickets.length && this.props.Employees.length && this.props.departments.length && this.props.Customers.length  ?
                    <div>
                        <h2> Code Number - {this.props.Tickets[0].code} </h2>
                        <div> 
                            { 
                               this.props.Tickets.map(ticket => {
                                    const customerData = this.props.Customers.find( cust => cust._id === ticket.customer)                                
                                    const depart = this.props.departments.find( dept => dept._id === ticket.department)                            
                                    const tkemployee = ticket.employees.map(ticketemp => {
                                            const employee = this.props.Employees.find( emp => emp._id === ticketemp._id)                                            
                                            return employee.name
                                        }) 

                                    return(
                                        <div key = {ticket._id} className = 'showTicket-full-section' >
                                            <label className = 'showTicket-customer-label' > Customer - {customerData.name}  </label>
                                            <br/>
                                            <label className = 'showTicket-employeelabel' > Employees - {
                                                  tkemployee.map((emp,i) =>{
                                                    return i+1 ==tkemployee.length ? emp : `${emp},`
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
                                    )
                               }) 
                            }

                            <br/>
                            <button className = 'ticketshow-editInfo_Button' onClick ={()=>{
                                this.hadleRedirect( `/ticket/edit/${this.props.Tickets[0]._id}`) }}> Edit </button> 
                        </div>
                    </div>
                 : <h2> Loading..... </h2>

                }
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        Employees: state.Employees,
        Tickets:state.Tickets,
        departments:state.departments,
        Customers:state.Customers     
    }
}

export default connect(mapStateToProps)(ShowTicket)
 