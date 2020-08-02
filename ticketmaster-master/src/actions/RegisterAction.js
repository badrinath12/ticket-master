import axios from 'axios'

export const setUserAccount= (UserAccount) => {
    return { type: 'SET_REGISTER', payload: UserAccount}
}

 
export const SetUserRegister= (UserAccount) => {        
    return (dispatch) => {
        axios.post(`http://dct-ticket-master.herokuapp.com/users/register`,UserAccount)            
                
        .then(response => {
           dispatch(setUserAccount(response.data)) 
        })   

        .catch(err =>{
            console.log(err)
        })

        
                
    }
}
 