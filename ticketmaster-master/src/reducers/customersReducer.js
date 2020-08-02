const customerInitialState = []

const customersReducer = (state = customerInitialState, action) => {
    switch(action.type) {
        case 'GET_CUSTOMERS' : {             
            return [].concat(action.payload)
        }

        case 'ADD_CUSTOMER' : {
            return state.concat(action.payload)
        }
         
        case 'REMOVE_CUSTOMER' : {
            return state.filter(customer => {
                return customer._id !== action.payload._id
            })
        }

        case 'EDIT_CUSTOMER' : {
            return state.map(customer =>{
                if(customer._id === action.payload._id) {
                    return Object.assign({},customer,action.payload)
                } else {
                    return Object.assign({},customer)
                }
            })
        }

        default: {
             return [].concat(state)
        }
    }
}

export default customersReducer