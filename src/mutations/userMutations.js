import { gql } from "@apollo/client";



const ALL_USERS = gql`
    query allUsers {
        allUsers{
            person{
                first_name
                last_name
                city
                email
                phone01
                id
                
            },
            user_name,
            id,
           
          }
    }
`




const UPDATE_USER = gql`
    mutation updateUser($id_person : ID!, $content : contentUpdateUser){
        updateUser(id_person : $id_person, content : $content){
            status
        }
    }
`

const CREATE_USER = gql`
    mutation createUser($content : contentUser!){
        createUser(content : $content){user{user_name},token}
    }
`

const DELETE_USER = gql`
    mutation deleteUser($id_person : ID!){
        deleteUser(id_person : $id_person){
            status
        }
    }
`

const AUTHENTICATE_USER = gql`
    mutation authenticateUser($content : userInfo){
        authenticateUser(content : $content){
            token
            user{user_name}
            
        }
    }
`

export {ALL_USERS, UPDATE_USER, DELETE_USER, CREATE_USER, AUTHENTICATE_USER}
