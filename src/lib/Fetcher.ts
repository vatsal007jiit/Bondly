import HttpInterceptor from "./HttpInterceptor"

const Fetcher = async (url: string)=>{
    try {
        const {data} = await HttpInterceptor.get(url)
        return data
    } 
    catch (error : any ){
       throw new error(error) 
    } 
}

export default Fetcher