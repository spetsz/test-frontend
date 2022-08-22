import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import Card from './Card'
import styles from '../../styles/board.module.css'
import Spinner from '../Spinner'

// Importing styles
const {board, container, actions, btn, details_item, grid, badge} = styles

const Board = ({query}) => {

    const {loading, error, data} = useQuery(query)
    if(loading) return <Spinner />
    if(error) return <p>Error!</p>

    // Checking fetched data is for clients or users
    let fetched
    if(query.definitions[0].name.value === "allClients"){
        fetched = {
            content : data.allClients,
            type : "clients"

        }
    }else if(query.definitions[0].name.value === "allUsers"){
        fetched = {
            content : data.allUsers,
            type : "users"
        }
    }


  return (
    <div className={board}>
        <div className={container}>
            
            <ul className={actions}>
                {fetched.type === "clients" ? <Link to="/client/add" className={btn}> + اضافة عميل</Link> : <Link to="/user/add" className={btn}> + اضافة مستخدم</Link>}                
                <li className={details_item}>الكل<span className={badge}>{fetched.content.length}</span></li>
            </ul>

            <div className={grid}>
                {!loading && !error && fetched.content.map(client => <Card type={fetched.type} user_name={client.user_name} password={client.password} client={client.person} key={client.id} /> )}
            </div>

        </div>
    </div>
  )
}

export default Board