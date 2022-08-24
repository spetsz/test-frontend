import { gql } from "@apollo/client";



const ALL_CLIENTS = gql`
    query allClients {
        allClients{
            person{
                first_name
                last_name
                city
                email
                phone01
                phone02
                id
                address
            },
            id
          }
    }
`

const CREATE_CLIENT = gql`
mutation createClient($content : contentClient!){
    createClient(content : $content){
        person{first_name}
    }

}
`

const DELETE_CLIENT = gql`
    mutation deleteClient($id_person : ID!){
        deleteClient(id_person : $id_person){
            status
        }
    }
`

const UPDATE_CLIENT = gql`
    mutation updateClient($id_person : ID! , $content : contentClient!){
        updateClient(id_person : $id_person, content : $content){
            status
        }
    }
`

const CREATE_USER = gql`
    mutation createUser($content : contentUser!){
        createUser(content : $content){user{user_name},token}
    }
`

export {CREATE_CLIENT, DELETE_CLIENT, ALL_CLIENTS, UPDATE_CLIENT, CREATE_USER}
