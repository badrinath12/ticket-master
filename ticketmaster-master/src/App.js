import React from 'react';  
import './App.css';
import {BrowserRouter,Route,Link,Redirect,Switch} from 'react-router-dom' 
import {ResetInitialToken}  from './actions/LoginAction'
import {connect} from 'react-redux'
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import LoginHome from './components/Login_Home'
import CustomersList from './components/customers/Customers'
import AddCustomer from './components/customers/NewCustomer'
import Editustomer from './components/customers/EditCustomer'
import ShowCustomer from './components/customers/CustomerShow'
import DepartmentsList from './components/departments/DepartmentsList'
import EditDepartmentInfo from './components/departments/EditDepartment'
import ShowDepartment from './components/departments/DepartmentShow'
import EmployeesList from './components/employees/EmployeeList'
import AddEmployeeInfo from './components/employees/AddEmployee'
import ShowEmployee from './components/employees/EmployeeShow'
import EditEmployee from './components/employees/EditEmployee'
import TicketList from './components/tickets/TicketList'
import AddTicketInfo from './components/tickets/AddTicket'
import EditTicketInfo from './components/tickets/EditTicket'
import ShowTicket from './components/tickets/ShowTicket'


function App(props) {    
  return (
    <BrowserRouter>
      <div>          
      {   ( localStorage.getItem('auth') !== null  ) ?   
            
            <div className = 'TopMenu' >
                <a className = 'TopMenu-header'>Ticket Master</a>
                <ul className = 'TopMenu-Login_LinksView'>
                    <li> <Link to ='/Home' > <button className = 'TopMenu_Login_Button'> Home</button></Link>  </li>
                    <li> <Link to ='/customers' > <button className = 'TopMenu_Login_Button'> Customers</button></Link>  </li>
                    <li> <Link to ='/departments' > <button className = 'TopMenu_Login_Button'> Departments</button></Link> </li>
                    <li> <Link to ='/employees' > <button className = 'TopMenu_Login_Button'> Employees</button></Link> </li>
                    <li> <Link to ='/tickets' > <button className = 'TopMenu_Login_Button'> Tickets</button></Link> </li>
                    <li> <Link to ='/' > <button className = 'TopMenu_Login_Button' onClick ={ ()=>{
                       var logstatus = window.confirm('Are you sure you want to log out?')
                       if( logstatus ) {
                             localStorage.clear()
                             alert('Successfully Logged out')
                             props.dispatch(ResetInitialToken())
                             return <Redirect to = '/' />
                         } 
                    }}> Logout</button></Link> </li>
                </ul>
            </div>
        
          :
            <div className = 'TopMenu' >
                <a className = 'TopMenu-header'>Ticket Master</a>
                <ul className = 'TopMenu-LinksView'>
                <li> <Link to ='/'    > <button className = 'TopMenu_Button'> Home</button></Link>  </li>
                <li> <Link to ='/Login'   > <button className = 'TopMenu_Button'> Login</button></Link>  </li>
                <li> <Link to ='/register'  > <button className = 'TopMenu_Button'> Register</button></Link> </li>
                </ul>
            </div>
         
      }
    
        <Switch>
          <Route path = '/' component = {Home} exact = {true} />
          <Route path = '/Login' component = {Login} exact = {true} />
          <Route path = '/register' component = {Register} exact = {true} />
          <Route path = '/Home' component = {LoginHome} exact = {true} />
          <Route path = '/customers' component = {CustomersList} exact = {true} />  
          <Route path = '/customer/new' component = {AddCustomer} exact = {true} />  
          <Route path = '/departments' component = {DepartmentsList} exact = {true} />
          <Route path = '/employees' component = {EmployeesList} exact ={true} />
          <Route path = '/employee/new' component = {AddEmployeeInfo} exact ={true} />
          <Route path = '/tickets' component = {TicketList} exact ={true} />
          <Route path = '/ticket/new' component = {AddTicketInfo} exact ={true} />
          <Route path = '/customer/edit/:id' component = {Editustomer} exact = {true} />
          <Route path = '/departments/edit/:id' component = {EditDepartmentInfo} exact = {true} />
          <Route path = '/ticket/edit/:id' component = {EditTicketInfo} exact = {true} />          
          <Route path = '/employee/edit/:id' component = {EditEmployee} exact = {true} />
          <Route path = '/ticket/:id' component = {ShowTicket} exact = {true} />
          <Route path = '/customer/:id' component = {ShowCustomer} exact = {true} />
          <Route path = '/departments/:id' component = {ShowDepartment} exact = {true} />
          <Route path = '/employees/:id' component = {ShowEmployee} exact ={true} />

         </Switch>
         
      </div>
    </BrowserRouter>
     
  );
}

const mapStateToProps = (state) => {
  return {
      token: state.token 
  }
}
export default connect(mapStateToProps)(App)
