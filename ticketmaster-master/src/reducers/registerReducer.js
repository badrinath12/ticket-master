const AccInfoInitialState = []

const registerReducer = (state = AccInfoInitialState, action) => {
    switch(action.type) {
        case 'SET_REGISTER' : {
            return state = action.payload
        }
         
        default: {            
             return state =''
        }
    }
}

export default registerReducer