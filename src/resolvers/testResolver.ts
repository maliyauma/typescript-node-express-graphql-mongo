import { User } from '../entities/Test';
import { Resolver, Query, Arg,Mutation } from 'type-graphql';
import { UserModel } from '../entities/Test';
import { UserInput } from '../types';
import { HydratedDocument } from 'mongoose';



@Resolver(()=> User)
export class TestResolver {
@Query(()=> [User])
  async users(): Promise<User[]> {
    const users=await UserModel.find({});
    // console.log("user returned========",users)
    return users
}

//create new post
@Mutation(()=>User)
async createUser(
@Arg('input')input:UserInput
) :Promise<User[]>{
    // console.log("user input========",input)
const user: HydratedDocument<User> = new UserModel({ name:input.name,email:input.email });
await user.save()
.then(e=>{console.log('user response =====',e)})
// console.log("user returned========",user)
//@ts-ignore
return user;
}
}