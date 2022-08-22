import { useEffect, useReducer } from 'react'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import {Ctx} from './Context'
import reducer from './Reducer/Reducer'
import ACTIONS from './Reducer/Actions'
import { ALL_CLIENTS } from './mutations/clientMutations'
import Navbar from './comps/layout/Navbar'
import Homepage from './comps/layout/Homepage'
import AddClient from './comps/clients/AddClient'
import AddUser from './comps/clients/AddUser'
import LogIn from './comps/clients/LogIn'

// Importing ACTIONS
const {SET_USER} = ACTIONS


// Setting initial state
const initialState = {
  search : "",
  data : {
    allClients : []
  },
  user : {},
  query : ALL_CLIENTS
}

// URI should go into env variables
const client = new ApolloClient({
  uri : 'https://test-api-9kapg.qafilaty.com/graphql',
  cache : new InMemoryCache()
})

const App = () => {

  const [globalState, dispatch] = useReducer(reducer, initialState)

  // Checking if a user is saved to localStorage
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      // Making user object a globalState
      const {authenticateUser} = user 
      dispatch({type: SET_USER, payload : authenticateUser})
    }

  }, [])
 




  return (

    <Ctx.Provider value={{globalState, dispatch}} >
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Navbar />
          <Routes>
            
            <Route path="/" exact element={<Homepage />} />
            <Route path="/login" exact element={<LogIn />} />
            <Route path="/client/add" exact element={<AddClient />} />
            <Route path="/user/add" exact element={<AddUser />} />
            

          </Routes>
        </ApolloProvider>
      </BrowserRouter>
    </Ctx.Provider>

    
    
  )
}

export default App