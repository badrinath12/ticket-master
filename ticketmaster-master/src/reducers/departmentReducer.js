const departmentInitialState = []

const departmentsReducer = (state = departmentInitialState, action) => {
    switch(action.type) {
        case 'GET_DEPARTMENT' : {             
            return [].concat(action.payload)
        } 
        case 'ADD_DEPARTMENT' :{
            return state.concat(action.payload)
        }

        case 'EDIT_DEPARTMENT' :{
            return state.map(depart =>{
                if(depart._id === action.payload._id) {
                    return Object.assign({},depart,action.payload)
                } else {
                    return Object.assign({},depart)
                }
            })
        }

        case 'REMOVE_DEPARTMENT' : {
            return state.filter(depart => {
                return depart._id !== action.payload._id
            })
        }

        default: {
             return [].concat(state)
        }
    }
}

export default departmentsReducer