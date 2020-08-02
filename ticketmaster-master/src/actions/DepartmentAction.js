import axios from 'axios'
 
export const getDepartmentinfo= (department) => {
    return { type: 'GET_DEPARTMENT', payload: department}
}
 
export const addDepartment= (department) => {
    return { type: 'ADD_DEPARTMENT', payload: department}
}

 
export const GetDepartment= () => {        
    return (dispatch) => {         
        axios.get(`http://dct-ticket-master.herokuapp.com/departments`,{
            headers :{
                'x-auth' :localStorage.getItem('auth')
            }
        }) 
        .then(response => {             
             dispatch(getDepartmentinfo(response.data))            
        })

        .catch(err =>{
            console.log(err)
        })

                   
    }
}


export const AddDepartment = (department) => {    
    return(dispatch) =>{         
        axios.post(`http://dct-ticket-master.herokuapp.com/departments`,department,{
            headers :{
                'x-auth': localStorage.getItem('auth')
            }
        }) 
 
        .then(response => { 
           if(response.data.hasOwnProperty('errors'))
           {
               alert('Customer not registered!')
           } else {                
                dispatch(addDepartment(response.data)) 
                // redirect()          
           }
        })

        .catch(err =>{
            console.log(err )
        })

    }
}
 
 

export const removeDepartment = (department) => {
    return {
        type: 'REMOVE_DEPARTMENT',
        payload: department
    }
}


export const RemoveDepartment = (id) => {    
    return(dispatch) =>{         
        axios.delete(`http://dct-ticket-master.herokuapp.com/departments/${id}`,{
            headers :{
                'x-auth': localStorage.getItem('auth')
            }
        }) 
 
        .then(response => { 
           if(response.data.hasOwnProperty('errors'))
           {
               alert('Department not deleted!')
           } else {                
            const department = response.data             
            dispatch(removeDepartment(department))        
           }
           
           
        })

        .catch(err =>{
            console.log(err)
        })

    }
}
 


export const editDepartment = (department) => {
    return {
        type: 'EDIT_DEPARTMENT',
        payload: department
    }
}

export const EditDepartment = (department,id,redirect) => {    
    return(dispatch) =>{         
        axios.put(`http://dct-ticket-master.herokuapp.com/departments/${id}`,department,{
            headers :{
                'x-auth': localStorage.getItem('auth')
            }
        }) 
 
        .then(response => { 
           if(response.data.hasOwnProperty('errors'))
           {
               alert('Department not editted !')
           } else {                
            const department = response.data             
            dispatch(editDepartment(department))
            redirect()        
           }
           
           
        })

        .catch(err =>{
            console.log(err)
        })

    }
}
 