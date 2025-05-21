import catchErr from "./CatchErr";
import HttpInterceptor from "./HttpInterceptor";

export const downloadData = async (path: string) => {
  try {
    const payload = {
      path,
    };

    const { data } = await HttpInterceptor.post("/storage/download", payload);
    return data.url;
  } 
  catch (error: unknown) {
    catchErr(error);
  }
};
