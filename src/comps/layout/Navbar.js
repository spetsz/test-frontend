import { useContext } from 'react'
import { Ctx } from '../../Context'
import ACTIONS from '../../Reducer/Actions'
import styles from '../../styles/navbar.module.css'

// Importing dispatch ACTIONS
const {UPDATE_SEARCH, SUBMIT_SEARCH} = ACTIONS

// Importing styles from css module
const {nav, container, left, nav_search, search_input,  avatar} = styles

const Navbar = () => {

    const {globalState, dispatch} = useContext(Ctx)
    const {search, user} = globalState

    const keydown = (e) =>{
        e.key === "Enter" && dispatch({type: SUBMIT_SEARCH, payload : e.target.value})
        
    }
   
  return (
    <nav className={nav}>
        
        <div className={container}>
        
            <div className={left}>

                {user.user && 
                    <>
                        <h4>{`${user.user.user_name}`}</h4>
                        <img className={avatar} /> 
                    </>
                }

            </div>    
                
            <div className={nav_search}>
                <input className={search_input} onKeyDown={(e)=>keydown(e)} onChange={(e)=>dispatch({type :UPDATE_SEARCH, payload : e.target.value})} value={search} placeholder="بحث" />
            </div>

         
        </div>

    </nav>
  )
}

export default Navbar