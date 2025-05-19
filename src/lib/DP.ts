import avatarMale from "../Images/avatar.webp";
import avatarFem from "../Images/avatar-fem.png";

const dp = (image: string, gender: string) =>{
    if(image)
      return image
    if(gender === "Male") 
      return avatarMale
    return avatarFem
  }

  export default dp