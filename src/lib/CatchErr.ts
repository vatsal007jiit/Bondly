import axios from "axios"
import { toast } from "react-toastify"

const catchErr = (err: unknown)=>{

    if(axios.isAxiosError(err))
        return toast.error(err.response?.data.message)

    if(err instanceof Error)
        return toast.error(err.message)

    toast.error("Network Error")
} 
export default catchErr