import ACTIONS from "./Actions"

// Importing ACTIONS
const {UPDATE_SEARCH, SUBMIT_SEARCH, SET_QUERY, SET_USER} = ACTIONS

const reducer = (state, action) =>{

    const {type, payload} = action
    switch(type){
  
      case SET_USER :
        return {...state, user : payload}
  
      case SET_QUERY:
        return {...state, query : payload}  
  
      case UPDATE_SEARCH:
        console.log(payload)
        return {...state, search : payload}
  
      case SUBMIT_SEARCH:
        // Search the payload's value and clear input field
        return {...state, search : ""}  
  
      default : 
        return state  
    }
}

export default reducer