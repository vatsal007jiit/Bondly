import catchErr from "./CatchErr"
import HttpInterceptor from "./HttpInterceptor"

 export const downloadProfilePic = async (image: string) =>{
    try {

      const payload = {
        path:`profile-pic/${image}`,
      }
      if(image)
      {
        const {data} = await HttpInterceptor.post("/storage/download",payload)
       return data.url
      }
    } 
    catch (error: unknown) {
      catchErr(error)
    }
  }