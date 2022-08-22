import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { AUTHENTICATE_USER, ALL_USERS } from '../../mutations/userMutations'
import styles from '../../styles/add_client.module.css'
import Spinner from '../Spinner'

// Importing styles
const {form, form_group, form_input, form_label, btn, btn_action, container, notification_area, notification} = styles

const LogIn = () => {

    const [fields, setFields] = useState({email : "", password : ""})
    const {email, password} = fields
    const router = useNavigate()
    const [err, setErrors] = useState('')


    const [authenticateUser, {data, loading}] = useMutation(AUTHENTICATE_USER, {variables : {content: fields},   refetchQueries: () => [{
        query: ALL_USERS
      }]})  
      
    if(loading) return <Spinner />
    if(data){
        localStorage.setItem('user', JSON.stringify(data))
        router('/')
        window.location.reload()
    }
    


const login = async () =>{
    if(email && password){
        try {

            await authenticateUser()
              
        } catch (error) {
            setErrors(error.message)
        }

    }else{
        setErrors('تأكد من ملأ كل الخانات أولا')
    }
}
    

  return (

    <div className={container}>
       
        <button type="button" className={btn_action} onClick={()=>router('/')}>{`< رجوع`}</button>
        <div className={notification_area}>
                {err && <div className={notification}>{err}</div>}
        </div>
        <form className={form}>
        
            <div className={form_group}>

                <input value={password} name="password" onChange={e => setFields({...fields, [e.target.name] : e.target.value})} className={form_input} type="password" />
                <label className={form_label}>كلمة السر</label>
                
            </div>

            <div className={form_group}>
                    
                <input value={email} name="email" onChange={e => setFields({...fields, [e.target.name] : e.target.value})}  className={form_input} type="email" />
                <label className={form_label}>البريد الالكتروني</label>

            </div>

            <button type="button" onClick={login} className={btn}>تسجيل الدخول</button>

        </form>
      
    </div>
   
  )
}

export default LogIn