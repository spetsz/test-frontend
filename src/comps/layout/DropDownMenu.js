import { useState } from 'react'
import { useMutation } from '@apollo/client'
import {DELETE_CLIENT, ALL_CLIENTS} from '../../mutations/clientMutations'
import {DELETE_USER, ALL_USERS} from '../../mutations/userMutations'
import UpdatePopUp from './UpdatePopUp'
import styles from '../../styles/card.module.css'


// Importing styles from css module
const {dropdown_actions, dropdown_exit, dropdown_item, dropdown_menu } = styles


const DropDownMenu = ({ dropdownHandler, id, type }) => {

  

    const updateClientHandler = () =>{
      dropdownHandler()
    }
 

    const [deleteClient] = useMutation(DELETE_CLIENT, {variables : {id_person : id},   refetchQueries: () => [{
      query: ALL_CLIENTS
    }]})


    const [deleteUser] = useMutation(DELETE_USER, {variables : {id_person : id},   refetchQueries: () => [{
      query: ALL_USERS
    }]})  

      
    const del = async () => {
      if(type === "clients"){
        await deleteClient()
      }else if(type === "users"){
        await deleteUser()
      }
    }
      

  return (
    <>
      
        <ul className={dropdown_menu}>
      
        <button className={dropdown_exit} onClick={dropdownHandler} > {`<`} </button>
        <div className={dropdown_actions}>
          <button type="button" onClick={()=>del()} className={dropdown_item}>حذف</button>
          <button type="button" onClick={updateClientHandler} className={dropdown_item}>تحديث</button>
         </div>
  
      </ul>
      
  
    </>
    
    
  )
}

export default DropDownMenu