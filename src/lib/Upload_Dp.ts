import catchErr from "./CatchErr"
import HttpInterceptor from "./HttpInterceptor"

type ACLType = "private" | "public-read"

export const uploadProfilePic = async (profileImage: any, id: number, acl: ACLType = 'private')=>{
    try {
      const payload = {
        path:`profile-pic/dp_${id}.jpg`,
        type:profileImage?.type,
        acl:acl
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