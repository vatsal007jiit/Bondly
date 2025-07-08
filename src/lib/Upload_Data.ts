import catchErr from "./CatchErr"
import HttpInterceptor from "./HttpInterceptor"

type ACLType = "private" | "public-read"

const uploadData = async (mediaFile: any, path: string, acl: ACLType = 'private')=>{
    try {
      const payload = {
        path: path,
        type: mediaFile?.type,
        acl: acl
      }

      const options = {
        headers:{
          'Content-Type': mediaFile?.type
        }
      }
      const {data} = await HttpInterceptor.post('/storage/upload', payload)
      await HttpInterceptor.put(data.url, mediaFile, options)
      // const response = await HttpInterceptor.put(data.url, mediaFile, options)
      // console.log("ETag:", response.headers.etag);
    } 
    catch (error: unknown) {
      catchErr(error)
    }
}

export default uploadData