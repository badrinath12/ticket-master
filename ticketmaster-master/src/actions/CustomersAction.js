import axios from 'axios' 

export const getCustomerinfo= (customers) => {
    return { type: 'GET_CUSTOMERS', payload: customers}
}
 
export const addCustomer= (customers) => {
    return { type: 'ADD_CUSTOMER', payload: customers}
}

 
export const GetCustomers= (token) => {        
    return (dispatch) => {         
        axios.get(`http://dct-ticket-master.herokuapp.com/customers`,{
            headers :{
                'x-auth' : token
            }
        }) 
        .then(response => {             
             dispatch(getCustomerinfo(response.data))            
        })

        .catch(err =>{
            console.log(err)
        })

                   
    }
}


export const AddCustomers = (customer,token,redirect) => {    
    return(dispatch) =>{         
        axios.post(`http://dct-ticket-master.herokuapp.com/customers`,customer,{
            headers :{
                'x-auth':token
            }
        }) 
 
        .then(response => { 
           if(response.data.hasOwnProperty('errors'))
           {
               alert('Customer not registered!')
           } else {                
                dispatch(addCustomer(response.data)) 
                redirect()          
           }
           
           
        })

        .catch(err =>{
            console.log(err ,customer)
        })

    }
}
 
 

export const removeCustomer = (customer) => {
    return {
        type: 'REMOVE_CUSTOMER',
        payload: customer
    }
}


export const RemoveCustomers = (id) => {    
    return(dispatch) =>{         
        axios.delete(`http://dct-ticket-master.herokuapp.com/customers/${id}`,{
            headers :{
                'x-auth': localStorage.getItem('auth')
            }
        }) 
 
        .then(response => { 
           if(response.data.hasOwnProperty('errors'))
           {
               alert('Customer not deleted!')
           } else {                
            const customer = response.data
             
            dispatch(removeCustomer(customer))        
           }
           
           
        })

        .catch(err =>{
            console.log(err)
        })

    }
}
 


export const editCustomer = (customer) => {
    return {
        type: 'EDIT_CUSTOMER',
        payload: customer
    }
}

export const EditCustomers = (customer,id,redirect) => {    
    return(dispatch) =>{         
        axios.put(`http://dct-ticket-master.herokuapp.com/customers/${id}`,customer,{
            headers :{
                'x-auth': localStorage.getItem('auth')
            }
        }) 
 
        .then(response => { 
           if(response.data.hasOwnProperty('errors'))
           {
               alert('Customer not editted !')
           } else {                
            const customer = response.data             
            dispatch(editCustomer(customer))
            redirect()        
           }
           
           
        })

        .catch(err =>{
            console.log(err)
        })

    }
}
 