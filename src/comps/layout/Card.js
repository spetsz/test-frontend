import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_CLIENTS, UPDATE_CLIENT } from '../../mutations/clientMutations'
import { ALL_USERS, UPDATE_USER} from '../../mutations/userMutations'
import DropDownMenu from './DropDownMenu'
import styles from '../../styles/card.module.css'

// Importing styles
const {body, body_loading, dialog, dropdown_exit, dropdown_menu, dropdown_item, btn, btn_save, header, header_right, info, title, small,badge, avatar, footer,footer_right }  = styles


const Card = ({client, type, user_name}) => {

    const {first_name, last_name, city, phone01, email, id} = client

    const cancelUpdate = () =>{

        // Restore intial values and turn input to disabled
        updateFields({current_full_name :first_name + ' ' + last_name,current_user_name: user_name, current_city :city, current_phone01 :phone01, current_email: email, new_password : ""})
        setInputDisabled(!inputDisabled) 
        
    }



    const [dropDown, setDropDown] = useState(false)
    const [loading, setLoading] = useState(false)
    const [inputDisabled, setInputDisabled] = useState(true)
    const [fields, updateFields] = useState({
    
        current_full_name : first_name + " " + last_name,
        current_email : email,
        current_phone01 : phone01,
        current_city : city,
        current_user_name : user_name,
        new_password : ""

    })
   
    const {current_city, current_email, current_full_name, current_phone01, current_user_name, new_password } = fields
    
   
   


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
            setInputDisabled(!inputDisabled)
        }    

    }

  return (

    <div className={loading ? body_loading : body}>

        <div className={header}>
            
           {dropDown &&  <DropDownMenu type={type} id={id} disabledInputHandler={() => setInputDisabled(!inputDisabled)} dropdownHandler={()=>setDropDown(!dropDown)} dropdown_exit={dropdown_exit} dropdown_item={dropdown_item} dropdown_menu={dropdown_menu} />}

            <button className={btn} onClick={()=>setDropDown(prev => prev = !prev)}>...</button>
            <div className={header_right}>
                <div className={info}>
                    {
                    type === "clients" ?  
                    <>
                        <input disabled={inputDisabled} style={{border : inputDisabled ? "transparent" : "1px dashed #7d749e"}} onChange={e =>updateFields({...fields, [e.target.name] : e.target.value})} name="current_full_name" value={current_full_name} className={title}></input> 
                    </>
                    : 
                    <>
                        <input disabled={inputDisabled} style={{border : inputDisabled ? "transparent" : "1px dashed #7d749e"}} onChange={e =>updateFields({...fields, [e.target.name] : e.target.value})} name="current_user_name" value={current_user_name} className={title}></input> 
                        <input disabled={inputDisabled} style={{border : inputDisabled ? "transparent" : "1px dashed #7d749e"}} onChange={e =>updateFields({...fields, [e.target.name] : e.target.value})} placeholder="كلمة سر جديدة؟" name="new_password" value={new_password} className={title}></input>
                    </>
                    }

                    
                    <input disabled={inputDisabled} style={{border : inputDisabled ? "transparent" : "1px dashed #7d749e"}} onChange={e =>updateFields({...fields, [e.target.name] : e.target.value})} name="current_city" value={current_city} className={badge}></input>

                </div>

                <img className={avatar}  />
            </div>
        </div>

        <div className={footer}>

            <input disabled={inputDisabled} onChange={e =>updateFields({...fields, [e.target.name] : e.target.value})} name="current_phone01" style={{border : inputDisabled ? "transparent" : "1px dashed #7d749e"}} value={current_phone01} className={small}></input>
            <input disabled={inputDisabled} onChange={e =>updateFields({...fields, [e.target.name] : e.target.value})} name="current_email" style={{border : inputDisabled ? "transparent" : "1px dashed #7d749e"}}  value={current_email} className={footer_right}></input>
            
        </div>
        
        {inputDisabled ? null : 
            <div className={dialog}> 
                <button type="button" onClick={update} className={btn_save}> حفظ التغييرات</button>
                <button type="button" onClick={cancelUpdate} className={btn_save}> الغاء</button> 
            </div> 
        }
    </div>

  )
}

export default Card