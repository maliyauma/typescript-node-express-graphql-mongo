import { HydratedDocument } from "mongoose";
import { User } from '../model/UserModel';
import { IUser } from '../model/UserModel';

export const UserResolver = {
  Query: {
    defaultUser: () => {
      // console.log("getting default user")
      return "am the captain now"},
      
      users:async() => {
        const users=await User.find()
        // console.log("user gotten ======= ",users)
       return users
    
      }
  },
  Mutation:{
    // mutationShape:(parent, args, context, info)=>{}
      createUser:async(parent, {name,email})=>{
       console.log("new user args ####",parent)
       const user: HydratedDocument<IUser>=new User({name,email})
       await user.save().then((p)=>console.log("create user response ========",p))
       .catch((p)=>console.log("error response ========",p))
      //  console.log("user ========",user)
       return user
      }

  }
}