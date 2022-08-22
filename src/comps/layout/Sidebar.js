import { useContext } from 'react'
import { useNavigate} from 'react-router-dom'
import { Ctx } from '../../Context'
import { ALL_CLIENTS } from '../../mutations/clientMutations'
import { ALL_USERS } from '../../mutations/userMutations'
import ACTIONS from '../../Reducer/Actions'
import styles from '../../styles/sidebar.module.css'
import logoImg from '../../logo.png'
import {FiHome} from 'react-icons/fi'
import {MdPersonOutline} from 'react-icons/md'
import {MdLogout} from 'react-icons/md'
import {HiLogin} from 'react-icons/hi'

// Importing dispatch ACTIONS
const {SET_USER, SET_QUERY} = ACTIONS

// Importing styles from css module
const {sidebar, logo, menu, menu_item, menu_icon} = styles

const Sidebar = () => {
  const {dispatch, globalState} = useContext(Ctx)
  const {user} = globalState
  const router = useNavigate()

  const logOut = () =>{
    localStorage.removeItem('user')
    dispatch({type : SET_USER, payload : {}})
  }
    
  return (
    <div className={sidebar}>
      
      <img src={logoImg} className={logo} alt="logo" />
      <ul className={menu}>
        
        <li className={menu_item}>
          <FiHome onClick={()=>{dispatch({type: SET_QUERY, payload : ALL_CLIENTS}); router('/')}} className={menu_icon} />
        </li>
        
        <li className={menu_item}>
          <MdPersonOutline onClick={()=>{dispatch({type: SET_QUERY, payload : ALL_USERS});router('/')}} className={menu_icon} />
        </li>

        {user.user ? 
        <li className={menu_item}>
            <MdLogout onClick={()=>{logOut()}} className={menu_icon} />
          </li> : 
          <li className={menu_item}>
            <HiLogin onClick={()=>router('/login')} className={menu_icon} />
          </li> 
          }
       
      </ul>
    
      

    </div>
  )
}

export default Sidebar