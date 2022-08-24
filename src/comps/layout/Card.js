import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_CLIENTS, UPDATE_CLIENT, DELETE_CLIENT } from '../../mutations/clientMutations'
import { ALL_USERS, UPDATE_USER, DELETE_USER} from '../../mutations/userMutations'
//import DropDownMenu from './DropDownMenu'
import styles from '../../styles/card.module.css'
import UpdatePopUp from './UpdatePopUp'

// Importing styles
const {body, body_loading, dropdown_exit, dropdown_actions, dropdown_menu, dropdown_item, btn, header, header_right, info, title, small,badge, avatar, footer,footer_right }  = styles

const getRandomColor = ()=>{
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

const Card = ({client, type, user_name}) => {

    const {first_name, last_name, city, phone01, email, id} = client

    const cancelUpdate = () =>{

        // Restore intial values and turn input to disabled
        updateFields({current_full_name :first_name + ' ' + last_name,current_user_name: user_name, current_city :city, current_phone01 :phone01, current_email: email, new_password : ""})
        
    }

    const [popup, setPopup] = useState(false)
    const [backgroundColor , setBackgroundcolor] = useState(getRandomColor)
    const [dropDown, setDropDown] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fields, updateFields] = useState({
    
        current_full_name : first_name + " " + last_name,
        current_email : email,
        current_phone01 : phone01,
        current_city : city,
        current_user_name : user_name,
        new_password : ""

    })
   
    const {current_city, current_email, current_full_name, current_phone01, current_user_name, new_password } = fields
    
   
    const [deleteClient] = useMutation(DELETE_CLIENT, {variables : {id_person : id},   refetchQueries: () => [{
        query: ALL_CLIENTS
      }]})
  
  
    const [deleteUser] = useMutation(DELETE_USER, {variables : {id_person : id},   refetchQueries: () => [{
        query: ALL_USERS
    }]})  
   


    const [updateClient] = useMutation(UPDATE_CLIENT, {variables : {id_person : client.id, content :{
        person : {
            first_name : current_full_name.split(' ')[0],
            last_name : current_full_name.split(' ')[1],
            city : current_city,
            email : current_email,
            phone01 : current_phone01
        }
    }}, refetchQueries: () => [{
      query: ALL_CLIENTS
    }]})

    const [updateUser] = useMutation(UPDATE_USER, {variables : {id_person : client.id, content :{
        person : {
            city : current_city,
            email : current_email,
            phone01 : current_phone01

        },
        newPassword : new_password,
        user_name : current_user_name
        
    }}, refetchQueries: () => [{
      query: ALL_USERS
    }]})
    

    const del = async () => {
        if(type === "clients"){
          await deleteClient()
        }else if(type === "users"){
          await deleteUser()
        }
      }

    const update = async () =>{

        if(current_city && current_email && current_full_name && current_phone01){
            if(type === 'clients'){
                setLoading(true)
                await updateClient()
                setLoading(false)
                
            }else if(type === 'users'){
                setLoading(true)
                await updateUser()
                setLoading(false)
            }
        }    

    }

  return (

    <>

    <div className={loading ? body_loading : body}>

        <div className={header}>
            
        {
            dropDown && <ul className={dropdown_menu}>
      
            <button className={dropdown_exit} onClick={()=>setDropDown(prev => prev = !prev)} > {`<`} </button>
            <div className={dropdown_actions}>
                <button type="button" onClick={del} className={dropdown_item}>حذف</button>
                <button type="button" onClick={()=>{setPopup(!popup) ;setDropDown(!dropDown)}} className={dropdown_item}>تحديث</button>
            </div>
          
        </ul> 
        }
            
            
            <button className={btn} onClick={()=>{setDropDown(!dropDown)}}>...</button>
            <div className={header_right}>
                <div className={info}>
                    {
                    type === "clients" ?  
                    <>
                        <input disabled style={{border : "transparent"}} onChange={e =>updateFields({...fields, [e.target.name] : e.target.value})} name="current_full_name" value={current_full_name} className={title}></input> 
                    </>
                    : 
                    <>
                        <input disabled style={{border : "transparent"}} onChange={e =>updateFields({...fields, [e.target.name] : e.target.value})} name="current_user_name" value={current_user_name} className={title}></input> 
                        <input disabled style={{border : "transparent"}} onChange={e =>updateFields({...fields, [e.target.name] : e.target.value})} placeholder="كلمة سر جديدة؟" name="new_password" value={new_password} className={title}></input>
                    </>
                    }

                    
                    <input disabled style={{border : "transparent"}} onChange={e =>updateFields({...fields, [e.target.name] : e.target.value})} name="current_city" value={current_city} className={badge}></input>

                </div>

                <div className={avatar} style={{backgroundColor}} >{first_name.split('')[0]}</div>  
            </div>
        </div>

        <div className={footer}>

            <input disabled onChange={e =>updateFields({...fields, [e.target.name] : e.target.value})} name="current_phone01" style={{border :"transparent" }} value={current_phone01} className={small}></input>
            <input disabled onChange={e =>updateFields({...fields, [e.target.name] : e.target.value})} name="current_email" style={{border : "transparent"}}  value={current_email} className={footer_right}></input>
            
        </div>
        
     
    </div>
    {popup && <UpdatePopUp popupHandler={()=>{setPopup(!popup)}} client={client} type={type} user_name={user_name} />}
    </>

  )
}

export default Card