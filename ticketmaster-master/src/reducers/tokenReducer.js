const tokenInitialState = {}

const tokenReducer = (state = tokenInitialState, action) => {
    switch(action.type) {
        case 'SET_TOKEN' : {            
            return action.payload
        }
        case 'RESET_TOKEN' : {
            return {}
        }
        default: {
           
             return  {}
        }
    }
}

export default tokenReducer