import axios from 'axios' 

export const getEmployeesinfo= (customers) => {
    return { type: 'GET_EMPLOYEES', payload: customers}
}
 
 
 
export const GetEmployees= () => {        
    return (dispatch) => {         
        axios.get(`http://dct-ticket-master.herokuapp.com/employees`,{
            headers :{
                'x-auth' : localStorage.getItem('auth')
            }
        }) 
        .then(response => { 
                        
             dispatch(getEmployeesinfo(response.data))            
        })

        .catch(err =>{
            console.log(err)
        })

                   
    }
}
 

export const addEmployeesinfo= (customers) => {
    return { type: 'ADD_EMPLOYEE', payload: customers}
}
 
export const AddEmployee= (employee,redirect) => {        
    return (dispatch) => {         
        axios.post(`http://dct-ticket-master.herokuapp.com/employees`,employee,{
            headers :{
                'x-auth' : localStorage.getItem('auth')
            }
        }) 
        .then(response => { 
            console.log(response.data)            
             dispatch(addEmployeesinfo(response.data)) 
            redirect()
        })

        .catch(err =>{
            console.log(err)
        })

                   
    }
}



export const editEmployee = (employee) => {
    return {
        type: 'EDIT_EMPLOYEE',
        payload: employee
    }
}

export const EditCustomers = (employee,id,redirect) => {    
    return(dispatch) =>{         
        axios.put(`http://dct-ticket-master.herokuapp.com/employees/${id}`,employee,{
            headers :{
                'x-auth': localStorage.getItem('auth')
            }
        }) 
 
        .then(response => { 
           if(response.data.hasOwnProperty('errors'))
           {
               alert('Employee info not editted !')
           } else {                
            const employee = response.data             
            dispatch(editEmployee(employee))
            redirect()        
           }
           
           
        })

        .catch(err =>{
            console.log(err)
        })

    }
}
 


export const removeEmployee = (employee) => {
    return {
        type: 'REMOVE_EMPLOYEE',
        payload: employee
    }
}

export const RemoveEmployee= (id) => {    
    return(dispatch) =>{         
        axios.delete(`http://dct-ticket-master.herokuapp.com/employees/${id}`,{
            headers :{
                'x-auth': localStorage.getItem('auth')
            }
        }) 
 
        .then(response => { 
           if(response.data.hasOwnProperty('errors'))
           {
               alert('Employee not removed !')
           } else {                
            const employee = response.data             
            dispatch(removeEmployee(employee))
                 
           }
           
           
        })

        .catch(err =>{
            console.log(err)
        })

    }
}
 

