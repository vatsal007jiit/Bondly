import catchErr from "./CatchErr"
import HttpInterceptor from "./HttpInterceptor"

export const uploadProfilePic = async (profileImage: any, id: number)=>{
    try {
      const payload = {
        path:`profile-pic/dp_${id}.jpg`,
        type:profileImage?.type
      }

      const options = {
        headers:{
          'Content-Type': profileImage?.type
        }
      }
      const {data} = await HttpInterceptor.post('/storage/upload', payload)
     
      const response = await HttpInterceptor.put(data.url, profileImage, options)
      console.log("ETag:", response.headers.etag);
    } 
    catch (error: unknown) {
      catchErr(error)
    }
  }