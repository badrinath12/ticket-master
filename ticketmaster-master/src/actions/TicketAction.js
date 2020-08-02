import axios from 'axios' 

export const getTicketinfo= (ticket) => {
    return { type: 'GET_TICKETS', payload: ticket}
}
 
 
 
export const GetTickets= () => {        
    return (dispatch) => {         
        axios.get(`http://dct-ticket-master.herokuapp.com/tickets`,{
            headers :{
                'x-auth' : localStorage.getItem('auth')
            }
        }) 
        .then(response => {             
             dispatch(getTicketinfo(response.data))            
        })

        .catch(err =>{
            console.log(err)
        })

                   
    }
}

export const GetSingleTicket= (id) => {        
    return (dispatch) => {         
        axios.get(`http://dct-ticket-master.herokuapp.com/tickets/${id}`,{
            headers :{
                'x-auth' : localStorage.getItem('auth')
            }
        }) 
        .then(response => {             
             dispatch(getTicketinfo(response.data))            
        })

        .catch(err =>{
            console.log(err)
        })

                   
    }
}
  
  
export const addTicketinfo= (ticket) => {
    return { type: 'ADD_TICKET', payload: ticket}
}
 
export const AddTicket= (ticket,redirect) => {        
    return (dispatch) => {         
        axios.post(`http://dct-ticket-master.herokuapp.com/tickets`,ticket,{
            headers :{
                'x-auth' : localStorage.getItem('auth')
            }
        }) 
        .then(response => {                       
             dispatch(addTicketinfo(response.data)) 
             redirect()
        })

        .catch(err =>{
            console.log(err)
        })

                   
    }
}
 
export const editTicket = (ticket) => {
    return {
        type: 'EDIT_TICKET',
        payload: ticket
    }
}

export const EditTicket = (ticket,id,redirect) => {    
    return(dispatch) =>{         
        axios.put(`http://dct-ticket-master.herokuapp.com/tickets/${id}`,ticket,{
            headers :{
                'x-auth': localStorage.getItem('auth')
            }
        }) 
 
        .then(response => { 
           if(response.data.hasOwnProperty('errors'))
           {
               alert('Ticket info not editted !')
           } else {                
            const employee = response.data             
            dispatch(editTicket(employee))
            redirect()        
           }
           
           
        })

        .catch(err =>{
            console.log(err)
        })

    }
}
  

export const removeTicket = (ticket) => {
    return {
        type: 'REMOVE_TICKET',
        payload: ticket
    }
}

export const RemoveTicket= (id,redirect) => {    
    return(dispatch) =>{         
        axios.delete(`http://dct-ticket-master.herokuapp.com/tickets/${id}`,{
            headers :{
                'x-auth': localStorage.getItem('auth')
            }
        }) 
 
        .then(response => { 
           if(response.data.hasOwnProperty('errors'))
           {
               alert('Ticket not removed !')
           } else {                
                const ticket = response.data             
                dispatch(removeTicket(ticket))
                redirect()
           }
           
           
        })

        .catch(err =>{
            console.log(err)
        })

    }
}
 

