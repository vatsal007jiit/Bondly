import { createContext } from 'react'

const UserContext = createContext<any>({
    loggedInUser: ""
})

export default UserContext
