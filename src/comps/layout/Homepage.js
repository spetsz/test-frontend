import {useContext} from 'react'
import { Ctx } from "../../Context"
import Board from "./Board"
import Sidebar from "./Sidebar"

const Homepage = () => {

    const {globalState} = useContext(Ctx)
    const {query} = globalState

    return (
        <>
            <Sidebar />
            <Board query={query} />

        </>
      )
}

export default Homepage