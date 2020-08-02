import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' 
import tokenReducer from '../reducers/tokenReducer'
import registerReducer from '../reducers/registerReducer'
import customersReducer from '../reducers/customersReducer'
import departmentsReducer from '../reducers/departmentReducer'
import employeesReducer from '../reducers/employeesReducer'
import ticketReducer from '../reducers/ticketReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        token: tokenReducer,
        UserAccountInfo: registerReducer,
        Customers:customersReducer ,
        departments:departmentsReducer,
        Employees:employeesReducer,
        Tickets:ticketReducer
    }), applyMiddleware(thunk))
 
    return store 
}

export default configureStore
