import { useState, useReducer } from 'react'
import  {useMutation} from '@apollo/client'
import styles from '../../styles/add_client.module.css'
import { UPDATE_CLIENT } from '../../mutations/clientMutations'
import { UPDATE_USER } from '../../mutations/userMutations'

const {popup, container, btn_action, btn, form, form_group, form_input, form_group_100w, form_label, notification, notification_area} = styles

// Reducer function for updating input fields
const reducer = (state, action) =>{

    const {type, payload} = action

    switch(type){

        case 'UPDATE_FIELD':
            return {...state, [payload.target.name] : payload.target.value}

        default :
            return state    
    }
}



const UpdatePopUp = ({client, type, user_name, popupHandler}) => {



   
    
    const [err, setErrors] = useState('')

    
    let initial_user_name = type === "users" ? user_name : ""
    const [formFields, localDispatch] = useReducer(reducer, {
        first_name : client.first_name,
        last_name : client.last_name,
        email : client.email,
        phone01 : client.phone01,
        phone02 : client.phone02,
        city : client.city,
        address : client.address,
        newPassword : "",
        user_name : initial_user_name
    })

    const {first_name, last_name, email, phone01, phone02, city, address, newPassword} =  formFields

    const [updateClient] = useMutation(UPDATE_CLIENT, {variables : {id_person : client.id, content :{
        person : {
            first_name,
            last_name,
            city,
            email,
            phone01,
            phone02,
            address
        }
    }}})

   
    const [updateUser] = useMutation(UPDATE_USER, {variables : {id_person : client.id, content :{
        person : {
            city,
            email : formFields.email,
            phone01 : formFields.phone01,
            phone02,
            first_name : formFields.first_name,
            last_name : formFields.last_name,
            address

        },
        newPassword,
        user_name : formFields.user_name
        
    }}})

   


    const update = async () =>{

        if(city && email && first_name && last_name && phone01){
            if(type === 'clients'){

                await updateClient()
                window.location.reload()


                
            }else if(type === 'users'){
                await updateUser()
                window.location.reload()
            }
        }    

    }
   



  return (
    <div className={popup}>
        <div className={container}>
        
        <button type="button" className={btn_action} onClick={()=>popupHandler()}>{`< رجوع`}</button>
        
        <div className={notification_area}>
            {err && <div className={notification}>{err}</div>}
        </div>
        
        <form className={form} style={{backgroundColor : "white"}}>

            <div className={form_group}>

                <input value={last_name} name="last_name" onChange={e => localDispatch({type : "UPDATE_FIELD", payload : e})} className={form_input} type="text" />
                <label className={form_label}>الإسم الأخير</label>

            </div>

             <div className={form_group}>

                <input value={first_name} name="first_name" onChange={e => localDispatch({type : "UPDATE_FIELD", payload : e})} className={form_input} type="text" />
                <label className={form_label}>الإسم الأول</label>

            </div>

            <div className={form_group}>

                <input value={phone02} name="phone02" onChange={e => localDispatch({type : "UPDATE_FIELD", payload : e})} className={form_input} type="text" />
                <label className={form_label}> رقم الهاتف الثاني</label>

            </div>

            <div className={form_group}>

                <input value={phone01} name="phone01" onChange={e => localDispatch({type : "UPDATE_FIELD", payload : e})} className={form_input} type="text" />
                <label className={form_label}> رقم الهاتف الأول</label>

            </div>

             <div className={form_group}>

                <input value={email} name="email" onChange={e => localDispatch({type : "UPDATE_FIELD", payload : e})} className={form_input} type="email" />
                <label className={form_label}> البريد الالكتروني</label>

            </div>

            

            {
                type === "users" ?
                <>
                    <div className={form_group}>
                        <input value={formFields.user_name} name="user_name" onChange={e => localDispatch({type : "UPDATE_FIELD", payload : e})} className={form_input} type="text" />
                        <label className={form_label}>اسم المستخدم</label>

                    </div> 
                    
                    <div className={form_group}>

                        <input value={newPassword} name="newPassword" onChange={e => localDispatch({type : "UPDATE_FIELD", payload : e})} className={form_input} type="password" />
                        <label className={form_label}>كلمة السر الجديدة</label>

                    </div>
                </>    
                : null
            }

            

             
            
           

            <div className={form_group}>

<select className={form_input} value={city} name="city" onChange={e => localDispatch({type : "UPDATE_FIELD", payload : e})}  >

    <option value="0">الولاية اختر</option>
    <option value="1">1 - أدرار</option>
    <option value="2">2 -  الشلف</option>
    <option value="3">3 - الأغواط</option>
    <option value="4">4 - أم البواقي</option>
    <option value="5">5 - باتنة</option>
    <option value="6">6 -  بجاية</option>
    <option value="7">7 - بسكرة</option>
    <option value="8">8 - بشار</option>
    <option value="9">9 - البليدة</option>
    <option value="10">10 - البويرة</option>
    <option value="11">11 - تمنراست</option>
    <option value="12">12 - تبسة</option>
    <option value="13">13 - تلمسان</option>
    <option value="14">14 - تيارت</option>
    <option value="15">15 - تيزي وزو</option>
    <option value="16">16 - الجزائر</option>
    <option value="17">17 - الجلفة</option>
    <option value="18">18 - جيجل</option>
    <option value="19">19 - سطيف</option>
    <option value="20">20 - سعيدة</option>
    <option value="21">21 - سكيكدة</option>
    <option value="22">22 - سيدي بلعباس</option>
    <option value="23">23 - عنابة</option>
    <option value="24">24 - قالمة</option>
    <option value="25">25 - قسنطينة</option>
    <option value="26">26 - المدية</option>
    <option value="27">27 - مستغانم</option>
    <option value="28">28 - المسيلة</option>
    <option value="29">29 - معسكر</option>
    <option value="30">30 - ورقلة</option>
    <option value="31">31 - وهران</option>
    <option value="32">32 - البيض</option>
    <option value="33">33 - إليزي</option>
    <option value="34">34 - برج بوعريريج</option>
    <option value="35">35 - بومرداس</option>
    <option value="36">36 - الطارف</option>
    <option value="37">37 - تندوف</option>
    <option value="38">38 - تيسمسيلت</option>
    <option value="39">39 - الوادي</option>
    <option value="40">40 - خنشلة</option>
    <option value="41">41 - سوق أهراس</option>
    <option value="42">42 - تيبازة</option>
    <option value="43">43 - ميلة</option>
    <option value="44">44 - عين الدفلة</option>
    <option value="45">45 - النعامة</option>
    <option value="46">46 - عين تيموشنت</option>
    <option value="47">47 - غرداية</option>
    <option value="48">48 - غليزان</option>
    <option value="49">49 - تيميمون</option>
    <option value="50">50 - برج باجي مختار</option>
    <option value="51">51 - أولاد جلال</option>
    <option value="52">52 - بني عباس</option>
    <option value="53">53 - عين صالح</option>
    <option value="54">54 - عين قزام</option>
    <option value="55">55 - تقرت</option>
    <option value="56">56 - جانت</option>
    <option value="57">57 - المغير</option>
    <option value="58">58 - المنيعة</option>

</select>

<label className={form_label}>المدينة</label>

</div>

<div className={form_group_100w}>

<input value={address} name="address" onChange={e => localDispatch({type : "UPDATE_FIELD", payload : e})} className={form_input} type="text" />
<label className={form_label}> العنوان</label>

</div>

            

            

           
            <button type="button" onClick={update} className={btn}>تحديث</button>


        </form>
        
      </div>
    </div>
  )
}

export default UpdatePopUp