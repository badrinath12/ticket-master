import React from 'react' 
import {connect} from 'react-redux'
import {GetEmployees} from '../../actions/EmplyeesAction'
import {GetTickets,EditTicket,RemoveTicket} from '../../actions/TicketAction'
import {GetCustomers} from '../../actions/CustomersAction'
import {GetDepartment} from '../../actions/DepartmentAction'
import Chart from "react-google-charts"

class TicketList extends React.Component {     
     constructor() {
         super()
         this.state = {
             DataFetched : false,
             LocalTickets :[],
             viewData: 'All',
             tableviewData:'Status',
             searchtext:'',
             completed:''
         }
     }
    componentDidMount = () =>{         
        this.props.dispatch(GetEmployees()) 
        this.props.dispatch(GetTickets()) 
        this.props.dispatch(GetCustomers(localStorage.getItem('auth'))) 
        this.props.dispatch(GetDepartment())

        const refersh =  setInterval( () =>{      
             
            if (this.props.Employees.length && this.props.Tickets.length && this.props.departments.length && this.props.Customers.length) {                
                this.setState({DataFetched:true , LocalTickets :  this.props.Tickets})
                clearInterval(refersh)
                const completed =  this.props.Tickets.filter(tkt =>{
                    return tkt.isResolved
                })

                const total = Math.round(completed.length/this.props.Tickets.length *100)
                this.setState({completed : total})
            }  
        } , 1000 ) 
    }

    handleRemoveTicket = (id) =>{       
        this.props.dispatch(RemoveTicket(id))        
        const redirect = () => window.location.reload(false);
        this.props.dispatch(RemoveTicket(id, redirect))

    }

    handleTicketComplete =(id) =>{
        let setstatus = true
        if(this.state.tableviewData === 'Not Complete') {
              setstatus = false
         } else  if(this.state.tableviewData ==='Complete') {
                 setstatus = true
        }
              
        const status= { "isResolved": setstatus }         
        const redirect = () => window.location.reload(false);
        this.props.dispatch(EditTicket(status,id,redirect)) 
    }
    
    hadleRedirect = (path) =>{
        this.props.history.push(path)
    } 

    filterTicket = (e) =>{
        let ticket = [],viewData=''
        if( e.target.name === 'Pending') {
            ticket = this.props.Tickets.filter(tkt => {
                return tkt.isResolved === false
            })
            viewData = 'Complete'
        } else if ( e.target.name === 'Completed') {
            ticket = this.props.Tickets.filter(tkt => {
                return tkt.isResolved 
            })
            viewData = 'Not Complete'
        }  else {
            viewData = 'Status'
            ticket = this.props.Tickets
        }
        this.setState ({LocalTickets :ticket , 
            viewData : e.target.name ,
             tableviewData :viewData
            })
 
           
    }

    handleSearch = (e) => {
        this.setState ( {searchtext : e.target.value})
        if( e.target.value !== '' ) {
            this.setState({ LocalTickets: this.state.LocalTickets.filter(tkt => {
                        return tkt.code.includes(e.target.value)
                    })  
            })
        } else {
             this.filterTicket(e)
        }

    }
    
    render() {
        const pendingTickets = this.props.Tickets.filter(ticket=>!ticket.isResolved)
        const high = pendingTickets.filter(ticket=>ticket.priority == 'High').length
        const medium = pendingTickets.filter(ticket=>ticket.priority == 'Medium').length
        const low = pendingTickets.filter(ticket=>ticket.priority == 'Low').length
        const data = [
            ["Priority", "Tickets per Category"],
            ["High", high],
            ["Medium",medium],
            ["Low", low]
          ]
        const options = {
            title: "Ticket Priority",
            pieHole: 0.4,
            is3D: false,
            backgroundColor: 'aqua'
            
          }

          const data2 = []
          const Header = ["Departments", "Tickets"]
          data2.push(Header)
            this.props.departments.map(dept=>{
                    const temp = []
                    temp.push(`${dept.name}`)
                    temp.push(pendingTickets.filter(ticket=>(ticket.department === dept._id)).length)
                    data2.push(temp)
            })
            
            const options2 = {
                title: "Ticket by Deprtment",
                 
                backgroundColor: 'aqua'
                
              }
               
        return(
            <div className = "ticket-list-Info">
                <button className = 'ticket-All-button' name = 'All' onClick = {this.filterTicket}  >  All </button>   &nbsp;
                <button className = 'ticket-pending-button' name = 'Pending' onClick = {this.filterTicket}  >  Pending </button>   &nbsp;
                <button className = 'ticket-completed-button' name = 'Completed' onClick = {this.filterTicket}  >Completed </button>  &nbsp;
                <input type= 'text' name = {this.state.viewData}  className = 'ticket-search-text'
                value = {this.state.searchtext} placeholder = 'Search' onChange = {this.handleSearch} ></input>

                <h2> {this.state.viewData} Tickets - {this.state.LocalTickets.length} </h2>
                <button className = 'Add-new-ticket_Button' onClick = {()=>{
                    this.hadleRedirect('/ticket/new')
                }}> Add Tickets</button> 
                <br/>
                <br/>

                <table border = '1' className='table-Ticket-info' style = {{align:'center'}}>
                    <thead>
                        <tr>
                            <th>Code no</th>
                            <th>Customer</th>
                            <th>Department</th>
                            <th>Employees</th>
                            <th>Message</th>
                            <th>Priority</th>
                            <th>Actions</th>
                            <th>Remove</th>
                            <th>{this.state.tableviewData}</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            this.state.DataFetched && this.state.LocalTickets ?
                            this.state.LocalTickets.map( (ticket,i)=>{                                
                                const customerData = this.props.Customers.find( cust => cust._id === ticket.customer)                                
                                const depart = this.props.departments.find( dept => dept._id === ticket.department)                            
                                const tkemployee = ticket.employees.map(ticketemp => {
                                        const employee = this.props.Employees.find( emp => emp._id === ticketemp._id)
                                        return employee.name
                                    }) 
                                
                               return ( <tr key ={i}>
                                    <td>{ticket.code}</td>
                                    <td> {customerData.name} </td> 
                                    <td>{depart.name}</td>
                                    <td>{ tkemployee.map((emp,i) =>{
                                        return i+1 ==tkemployee.length ? emp : `${emp},`
                                    }) }</td>
                                    <td> {ticket.message}</td>
                                    <td>{ticket.priority}</td>
                                    <td> 
                                    <button className = 'ticketList-icketinfo_Button' onClick ={()=>{
                                        this.hadleRedirect( `/ticket/${ticket._id}`) }}> Show</button>  </td>
                                    <td> 
                                        <button className = 'Tikcet-remove_Button'
                                         onClick = {() =>{this.handleRemoveTicket(ticket._id)}}> Remove</button></td>

                                    <td>
                                        { this.state.tableviewData === 'Status'?   ticket.isResolved  ? <label>Completed</label> : <label>Pending</label>
                                         : 
                                        <input type='checkbox'   onChange ={()=>{
                                                     this.handleTicketComplete(ticket._id) }} /> 
                                       }
                                     </td>
                                </tr>)                            
                            })
                             : null
                        }
                    </tbody>
                </table>
                <br/> 
                <label > Completed Tickets : {this.state.completed}%</label><br/>
                <progress id="ticket-info" value= {this.state.completed} max="100" className = 'ticket-progressbar'> 32% </progress>
                <br/>
                <br/>
                
                <Chart
                    width={'400px'}
                    height={'350px'}                  
                    chartType="PieChart"
                    className = 'piechar-tickets'
                    backgrou
                    data={ data}
                    options={options}
                    rootProps={{ 'data-testid': '1' }}
                 />

                <Chart
                    chartType="Bar"
                    width="50%"
                    height="400px"

                    data={data2}
                    className = 'barchar-tickets'
                    options={({
                        chart: {
                            title: 'Tickets By Department'  
                        },
                        colors: 'red',
                        backgroundColor: 'red'
                      })}
                     />
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
export default connect(mapStateToProps)(TicketList)
 