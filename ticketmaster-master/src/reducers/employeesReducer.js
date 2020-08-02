const employeesInitialState = []

const employeesReducer = (state = employeesInitialState, action) => {
    switch(action.type) {
        case 'GET_EMPLOYEES' : {             
            return [].concat(action.payload)
        }

        case 'ADD_EMPLOYEE' : {
            return state.concat(action.payload)
        }
         
        case 'REMOVE_EMPLOYEE' : {
            return state.filter(emp => {
                return emp._id !== action.payload._id
            })
        }

        case 'EDIT_EMPLOYEE' : {
            return state.map(emp =>{
                if(emp._id === action.payload._id) {
                    return Object.assign({},emp,action.payload)
                } else {
                    return Object.assign({},emp)
                }
            })
        }

        default: {
             return [].concat(state)
        }
    }
}

export default employeesReducer