import axios from 'axios'

export const setTokens= (loginResponse) => {
    return { type: 'SET_TOKEN', payload: loginResponse}
}

export const resetToken= () => {
    return { type: 'RESET_TOKEN'}
}
export const SetInitialToken= (loginFormData) => {     
     
    return (dispatch) => {         
        axios.post(`http://dct-ticket-master.herokuapp.com/users/login`,loginFormData) 
        .then(response => {
              
             if(response.data.hasOwnProperty('token')){                
               localStorage.setItem('auth',response.data.token)
            } 
             dispatch(setTokens(response.data)) 
             
        })

        .catch(err =>{
            console.log(err)
        })

                   
    }
}

export const ResetInitialToken= () => {   
    console.log('ResetToken')     
    return (dispatch) => {                    
            dispatch(resetToken())         
    }
}