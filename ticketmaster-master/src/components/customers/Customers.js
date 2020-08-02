import React from 'react' 
import {connect} from 'react-redux'
import {GetCustomers,RemoveCustomers} from '../../actions/CustomersAction'

class CustomersList extends React.Component {     
     
    componentDidMount = () =>{         
        this.props.dispatch(GetCustomers(localStorage.getItem('auth') ))
                
    }

    handleRemoveCustomer = (id) =>{       
        this.props.dispatch(RemoveCustomers(id))
    }
    
    hadleRedirect = (path) =>{
        this.props.history.push(path)
    }

    render() {        
        return(
            <div className = "customersInfo">                
                <h2> Customers - {this.props.Customers.length} </h2>
                <button className = 'Add-new-Customer_Button' onClick = {()=>{
                    this.hadleRedirect('/customer/new')
                }}> Add Customer</button> 
                <br/>
                <table border = '1' className='table-customer-info' style = {{align:'center'}}>
                    <thead>
                        <tr>
                            <th>ID#</th>
                            <th>Name</th>
                            <th> Email</th>
                            <th>Mobile</th>
                            <th>Actions</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            this.props.Customers.map( (cust,i)=>{
                               return ( <tr key ={i}>
                                    <td>{i+1}</td>
                                    <td>{cust.name}</td>
                                    <td>{cust.email}</td>
                                    <td>{cust.mobile}</td>
                                    <td> 
                                    <button className = 'customer-Ticketinfo_Button' onClick ={()=>{
                                        this.hadleRedirect( `/customer/${cust._id}`)
                                    }}> Show</button>  </td>
                                    <td> 
                                        <button className = 'customer-remove_Button'
                                         onClick = {() =>{this.handleRemoveCustomer(cust._id)}}> Remove</button></td>
                                    
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
        Customers: state.Customers         
    }
}
export default connect(mapStateToProps)(CustomersList)
 