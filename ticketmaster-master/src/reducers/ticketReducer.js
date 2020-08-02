const ticketInitialState = []

const ticketReducer = (state = ticketInitialState, action) => {
    switch(action.type) {
        case 'GET_TICKETS' : {             
            return [].concat(action.payload)
        } 
        case 'ADD_TICKET' :{
            return state.concat(action.payload)
        }

        case 'EDIT_TICKET' :{
            return state.map(depart =>{
                if(depart._id === action.payload._id) {
                    return Object.assign({},depart,action.payload)
                } else {
                    return Object.assign({},depart)
                }
            })
        }

        case 'REMOVE_TICKET' : {
            return state.filter(tkt => {
                return tkt._id !== action.payload._id
            })
        }

        default: {
             return [].concat(state)
        }
    }
}

export default ticketReducer